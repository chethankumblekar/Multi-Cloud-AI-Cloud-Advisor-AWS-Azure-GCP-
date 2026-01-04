using CloudAdvisor.Common.Enums;
using CloudAdvisor.RuleEngine.Interfaces;
using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.RuleEngine.Rules.Cost;

public class IdleComputeRule : IRule
{
    public RuleCategory Category => RuleCategory.CostOptimization;

    public IEnumerable<Finding> Evaluate(Common.Models.CloudEnvironment environment)
    {
        foreach (var resource in environment.Resources)
        {
            if (resource.Category != ResourceCategory.Compute)
                continue;

            if (resource.Cost.MonthlyUsd < 20)
                continue;

            if (!resource.Security.PubliclyAccessible &&
                !resource.Availability.IsMultiZone)
            {
                yield return new Finding
                {
                    Category = Category,
                    Severity = Severity.Medium,
                    Title = "Potentially idle compute resource",
                    Description =
                        "Compute resource shows characteristics of low utilization. Consider downsizing or scheduling shutdown.",
                    Resource = resource
                };
            }
        }
    }
}
