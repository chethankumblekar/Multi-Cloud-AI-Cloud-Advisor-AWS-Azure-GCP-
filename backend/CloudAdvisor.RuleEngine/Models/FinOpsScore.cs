namespace CloudAdvisor.RuleEngine.Models;

public class FinOpsScore
{
    public int Score { get; set; }          // 0 - 100
    public string RiskLevel { get; set; } = default!;
    public string Summary { get; set; } = default!;
}
