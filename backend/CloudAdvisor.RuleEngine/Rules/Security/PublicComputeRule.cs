using CloudAdvisor.Common.Enums;
using CloudAdvisor.RuleEngine.Interfaces;
using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.RuleEngine.Rules.Security;

public class PublicComputeRule : IRule
{
    public RuleCategory Category => RuleCategory.Security;

    public IEnumerable<Finding> Evaluate(Common.Models.CloudEnvironment environment)
    {
        foreach (var resource in environment.Resources)
        {
            if (resource.Category != ResourceCategory.Compute)
                continue;

            if (resource.Security.PubliclyAccessible)
            {
                yield return new Finding
                {
                    Category = Category,
                    Severity = Severity.High,
                    Title = "Publicly accessible compute",
                    Description = "Compute resource is publicly accessible and may be exposed to the internet.",
                    Resource = resource
                };
            }
        }
    }
}
