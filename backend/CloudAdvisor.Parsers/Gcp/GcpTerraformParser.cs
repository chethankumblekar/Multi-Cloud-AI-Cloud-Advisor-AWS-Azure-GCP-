using System.Text.Json;
using CloudAdvisor.Common.Enums;
using CloudAdvisor.Common.Models;
using CloudAdvisor.Parsers;
using CloudAdvisor.Parsers.Gcp;
using CloudAdvisor.Parsers.Terraform;
using CloudAdvisor.Parsers.Terraform.Models;

namespace CloudAdvisor.Parsers.Gcp;

public class GcpTerraformParser : ICloudParser
{
    public CloudEnvironment Parse(string terraformPlanJson)
    {
        var plan = JsonSerializer.Deserialize<TerraformPlan>(
            terraformPlanJson,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
        ) ?? throw new InvalidOperationException("Invalid Terraform plan");

        var environment = new CloudEnvironment
        {
            Provider = CloudProvider.GCP
        };

        var resources =
            TerraformResourceCollector.Collect(plan.PlannedValues.RootModule);

        foreach (var r in resources)
        {
            var mapped = GcpResourceMapper.Map(r);
            if (mapped != null)
                environment.Resources.Add(mapped);
        }

        return environment;
    }
}
