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

            if (resource.Cost.MonthlyUsd > 100)
            {
                yield return new Finding
                {
                    Category = Category,
                    Severity = Severity.Medium,
                    Title = "Potentially oversized compute",
                    Description = "Compute resource cost appears high. Consider right-sizing.",
                    Resource = resource
                };
            }
        }
    }
}
