using CloudAdvisor.Common.Enums;
using CloudAdvisor.Common.Models;
using CloudAdvisor.RuleEngine.Interfaces;
using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.RuleEngine.Rules.HighAvailability;

public class SingleZoneComputeRule : IRule
{
    public RuleCategory Category => RuleCategory.HighAvailability;

    public IEnumerable<Finding> Evaluate(CloudEnvironment environment)
    {
        foreach (var resource in environment.Resources)
        {
            if (resource.Category != ResourceCategory.Compute)
                continue;

            if (!resource.Availability.IsMultiZone)
            {
                yield return new Finding
                {
                    Category = Category,
                    Severity = Severity.High,
                    Title = "Single-zone compute detected",
                    Description = "Compute resource is deployed in a single availability zone, increasing downtime risk.",
                    Resource = resource
                };
            }
        }
    }
}
