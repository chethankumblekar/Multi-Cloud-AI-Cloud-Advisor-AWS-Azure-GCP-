using CloudAdvisor.Common.Enums;
using CloudAdvisor.Common.Models;
using CloudAdvisor.Parsers.Terraform.Models;

namespace CloudAdvisor.Parsers.Azure;

public static class AzureResourceMapper
{
    public static CloudResource? Map(TerraformResource r)
    {
        return r.Type switch
        {
            "azurerm_linux_virtual_machine" or
            "azurerm_windows_virtual_machine" => MapVm(r),

            "azurerm_storage_account" => MapStorage(r),

            "azurerm_mssql_database" => MapSql(r),

            "azurerm_application_gateway" => MapAppGateway(r),

            _ => null
        };
    }

    private static CloudResource MapVm(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.Azure,
            Category = ResourceCategory.Compute,
            ServiceName = "Azure VM",
            SizeTier = r.Values.GetValueOrDefault("size")?.ToString() ?? "unknown",

            Availability = new()
            {
                IsMultiZone = false, // zones require explicit config
                AvailabilityZones = 1,
                Region = r.Values.GetValueOrDefault("location")?.ToString() ?? "unknown"
            },

            Security = new()
            {
                PubliclyAccessible = true
            },

            Cost = new()
            {
                MonthlyUsd = 50,
                Assumptions = "Standard VM estimate"
            }
        };
    }

    private static CloudResource MapStorage(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.Azure,
            Category = ResourceCategory.Storage,
            ServiceName = "Storage Account",
            SizeTier = "standard",

            Availability = new()
            {
                IsMultiZone = true,
                AvailabilityZones = 3,
                Region = "regional"
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

    private static CloudResource MapSql(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.Azure,
            Category = ResourceCategory.Database,
            ServiceName = "Azure SQL",
            SizeTier = "general-purpose",

            Availability = new()
            {
                IsMultiZone = false,
                AvailabilityZones = 1,
                Region = "regional"
            },

            Cost = new()
            {
                MonthlyUsd = 120,
                Assumptions = "Azure SQL GP estimate"
            }
        };
    }

    private static CloudResource MapAppGateway(TerraformResource r)
    {
        return new CloudResource
        {
            Id = r.Name,
            Provider = CloudProvider.Azure,
            Category = ResourceCategory.Network,
            ServiceName = "Application Gateway",
            SizeTier = "standard_v2",

            Availability = new()
            {
                IsMultiZone = true,
                AvailabilityZones = 2,
                Region = "regional"
            },

            Cost = new()
            {
                MonthlyUsd = 30,
                Assumptions = "Low traffic gateway"
            }
        };
    }
}
