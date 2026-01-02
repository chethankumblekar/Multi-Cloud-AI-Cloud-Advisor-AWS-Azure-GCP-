using System.Text.Json;
using CloudAdvisor.Common.Enums;
using CloudAdvisor.Common.Models;
using CloudAdvisor.Parsers;
using CloudAdvisor.Parsers.Aws;
using CloudAdvisor.Parsers.Terraform;
using CloudAdvisor.Parsers.Terraform.Models;

namespace CloudAdvisor.Parsers.Azure;

public class AzureTerraformParser : ICloudParser
{
    public CloudEnvironment Parse(string terraformPlanJson)
    {
        var plan = JsonSerializer.Deserialize<TerraformPlan>(
            terraformPlanJson,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        ) ?? throw new InvalidOperationException("Invalid Terraform plan");

        var env = new CloudEnvironment
        {
            Provider = CloudProvider.Azure
        };

        var resources = TerraformResourceCollector.Collect(
            plan.PlannedValues.RootModule
        );

        foreach (var r in resources)
        {
            var mapped = AzureResourceMapper.Map(r);
            if (mapped != null)
                env.Resources.Add(mapped);
        }

        return env;
    }
}
