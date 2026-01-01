using CloudAdvisor.Common.Enums;
using CloudAdvisor.Common.Models;

namespace CloudAdvisor.Parsers.Aws;

public static class AwsResourceMapper
{
    public static CloudResource? Map(TerraformResource resource)
    {
        return resource.Type switch
        {
            "aws_instance" => MapEc2(resource),
            "aws_s3_bucket" => MapS3(resource),
            "aws_db_instance" => MapRds(resource),
            "aws_lb" or "aws_alb" => MapAlb(resource),
            _ => null
        };
    }

    private static CloudResource MapEc2(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.AWS,
            Category = ResourceCategory.Compute,
            ServiceName = "EC2",
            SizeTier = r.Values.GetValueOrDefault("instance_type")?.ToString() ?? "unknown",
            Availability = new()
            {
                IsMultiZone = false,
                AvailabilityZones = 1,
                Region = r.Values.GetValueOrDefault("availability_zone")?.ToString() ?? "unknown"
            },
            Security = new()
            {
                PubliclyAccessible = r.Values.ContainsKey("associate_public_ip_address"),
                EncryptedAtRest = false,
                UsesManagedIdentity = false
            },
            Cost = new()
            {
                MonthlyUsd = 40,
                Assumptions = "t3.medium estimated cost"
            }
        };
    }

    private static CloudResource MapS3(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.AWS,
            Category = ResourceCategory.Storage,
            ServiceName = "S3",
            SizeTier = "standard",
            Availability = new()
            {
                IsMultiZone = true,
                AvailabilityZones = 3,
                Region = "multi-region"
            },
            Security = new()
            {
                PubliclyAccessible = false,
                EncryptedAtRest = true
            },
            Cost = new()
            {
                MonthlyUsd = 5,
                Assumptions = "Low usage storage"
            }
        };
    }

    private static CloudResource MapRds(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.AWS,
            Category = ResourceCategory.Database,
            ServiceName = "RDS",
            SizeTier = r.Values.GetValueOrDefault("instance_class")?.ToString() ?? "unknown",
            Availability = new()
            {
                IsMultiZone = r.Values.ContainsKey("multi_az"),
                AvailabilityZones = r.Values.ContainsKey("multi_az") ? 2 : 1,
                Region = "regional"
            },
            Security = new()
            {
                EncryptedAtRest = true
            },
            Cost = new()
            {
                MonthlyUsd = 120,
                Assumptions = "db.t3.medium estimated"
            }
        };
    }

    private static CloudResource MapAlb(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.AWS,
            Category = ResourceCategory.Network,
            ServiceName = "ALB",
            SizeTier = "standard",
            Availability = new()
            {
                IsMultiZone = true,
                AvailabilityZones = 2,
                Region = "regional"
            },
            Cost = new()
            {
                MonthlyUsd = 20,
                Assumptions = "Low traffic ALB"
            }
        };
    }
}
