using CloudAdvisor.Common.Enums;
using CloudAdvisor.RuleEngine.Interfaces;
using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.RuleEngine.Rules.Cost;

public class OverReplicatedStorageRule : IRule
{
    public RuleCategory Category => RuleCategory.CostOptimization;

    public IEnumerable<Finding> Evaluate(Common.Models.CloudEnvironment environment)
    {
        foreach (var resource in environment.Resources)
        {
            if (resource.Category != ResourceCategory.Storage)
                continue;

            if (resource.Availability.AvailabilityZones >= 3 &&
                resource.Cost.MonthlyUsd < 10)
            {
                yield return new Finding
                {
                    Category = Category,
                    Severity = Severity.Low,
                    Title = "Possibly over-replicated storage",
                    Description =
                        "Storage appears highly replicated for low usage. Consider reducing replication for non-critical data.",
                    Resource = resource
                };
            }
        }
    }
}
