using CloudAdvisor.Common.Models;
using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.RuleEngine.Interfaces;

public interface IRule
{
    RuleCategory Category { get; }
    IEnumerable<Finding> Evaluate(CloudEnvironment environment);
}
