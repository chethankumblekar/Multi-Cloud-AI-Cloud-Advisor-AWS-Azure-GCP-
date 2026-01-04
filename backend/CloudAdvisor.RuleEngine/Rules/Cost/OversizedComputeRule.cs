using CloudAdvisor.Common.Enums;
using CloudAdvisor.RuleEngine.Interfaces;
using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.RuleEngine.Rules.Cost;

public class OversizedComputeRule : IRule
{
    public RuleCategory Category => RuleCategory.CostOptimization;

    public IEnumerable<Finding> Evaluate(Common.Models.CloudEnvironment environment)
    {
        foreach (var resource in environment.Resources)
        {
            if (resource.Category != ResourceCategory.Compute)
                continue;

            if (resource.Cost.MonthlyUsd > 80 &&
                !resource.Availability.IsMultiZone)
            {
                yield return new Finding
                {
                    Category = Category,
                    Severity = Severity.Medium,
                    Title = "Potentially oversized compute",
                    Description =
                        "Compute resource cost appears high without high availability requirements. Consider right-sizing.",
                    Resource = resource
                };
            }
        }
    }
}
