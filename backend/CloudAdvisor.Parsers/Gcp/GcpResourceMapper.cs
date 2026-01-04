using CloudAdvisor.Common.Enums;
using CloudAdvisor.Common.Models;
using CloudAdvisor.Parsers.Terraform.Models;

namespace CloudAdvisor.Parsers.Gcp;

public static class GcpResourceMapper
{
    public static CloudResource? Map(TerraformResource r)
    {
        return r.Type switch
        {
            "google_compute_instance" => MapCompute(r),
            "google_storage_bucket" => MapStorage(r),
            "google_sql_database_instance" => MapCloudSql(r),
            "google_compute_forwarding_rule" => MapLoadBalancer(r),
            _ => null
        };
    }

    private static CloudResource MapCompute(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.GCP,
            Category = ResourceCategory.Compute,
            ServiceName = "Compute Engine",
            SizeTier = r.Values.GetValueOrDefault("machine_type")?.ToString() ?? "unknown",

            Availability = new()
            {
                IsMultiZone = false, // zonal unless MIG used
                AvailabilityZones = 1,
                Region = r.Values.GetValueOrDefault("zone")?.ToString() ?? "unknown"
            },

            Security = new()
            {
                PubliclyAccessible = r.Values.ContainsKey("network_interface")
            },

            Cost = new()
            {
                MonthlyUsd = 45,
                Assumptions = "e2-medium estimated cost"
            }
        };
    }

    private static CloudResource MapStorage(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.GCP,
            Category = ResourceCategory.Storage,
            ServiceName = "Cloud Storage",
            SizeTier = "standard",

            Availability = new()
            {
                IsMultiZone = true,
                AvailabilityZones = 3,
                Region = r.Values.GetValueOrDefault("location")?.ToString() ?? "multi-region"
            },

            Security = new()
            {
                EncryptedAtRest = true
            },

            Cost = new()
            {
                MonthlyUsd = 5,
                Assumptions = "Low usage storage"
            }
        };
    }

    private static CloudResource MapCloudSql(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.GCP,
            Category = ResourceCategory.Database,
            ServiceName = "Cloud SQL",
            SizeTier = "db-custom",

            Availability = new()
            {
                IsMultiZone = false,
                AvailabilityZones = 1,
                Region = "regional"
            },

            Cost = new()
            {
                MonthlyUsd = 120,
                Assumptions = "Cloud SQL GP estimate"
            }
        };
    }

    private static CloudResource MapLoadBalancer(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.GCP,
            Category = ResourceCategory.Network,
            ServiceName = "Load Balancer",
            SizeTier = "standard",

            Availability = new()
            {
                IsMultiZone = true,
                AvailabilityZones = 2,
                Region = "global"
            },

            Cost = new()
            {
                MonthlyUsd = 25,
                Assumptions = "Low traffic LB"
            }
        };
    }
}
