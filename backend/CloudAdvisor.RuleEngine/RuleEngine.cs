using CloudAdvisor.Common.Models;
using CloudAdvisor.RuleEngine.Interfaces;
using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.RuleEngine;

public class RuleEngine
{
    private readonly IEnumerable<IRule> _rules;

    public RuleEngine(IEnumerable<IRule> rules)
    {
        _rules = rules;
    }

    public List<Finding> Evaluate(CloudEnvironment environment)
    {
        return _rules
            .SelectMany(rule => rule.Evaluate(environment))
            .ToList();
    }
}
