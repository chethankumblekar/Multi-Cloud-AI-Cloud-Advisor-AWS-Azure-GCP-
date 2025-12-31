using System.Text.Json;
using CloudAdvisor.Common.Enums;
using CloudAdvisor.Common.Models;
using CloudAdvisor.Parsers.Aws.Models;

namespace CloudAdvisor.Parsers.Aws;

public class AwsTerraformParser : ICloudParser
{
    public CloudEnvironment Parse(string terraformPlanJson)
    {
        var plan = JsonSerializer.Deserialize<TerraformPlan>(terraformPlanJson)
                   ?? throw new InvalidOperationException("Invalid Terraform plan");

        var environment = new CloudEnvironment
        {
            Provider = CloudProvider.AWS
        };

        foreach (var resource in plan.PlannedValues.RootModule.Resources)
        {
            var mapped = AwsResourceMapper.Map(resource);
            if (mapped != null)
            {
                environment.Resources.Add(mapped);
            }
        }

        return environment;
    }
}
