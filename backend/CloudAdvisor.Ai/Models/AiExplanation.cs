using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.Ai.Models;

public class AiExplanation
{
    public RuleCategory Category { get; set; }
    public Severity Severity { get; set; }

    public string Markdown { get; set; } = default!;
    public string WhyItMatters { get; set; } = default!;
    public string TradeOffs { get; set; } = default!;
}
