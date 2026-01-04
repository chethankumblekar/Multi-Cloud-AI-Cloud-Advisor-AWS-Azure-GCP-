using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.RuleEngine.Scoring;

public static class FinOpsScorer
{
    public static FinOpsScore Calculate(IEnumerable<Finding> findings)
    {
        var costFindings = findings
            .Where(f => f.Category == RuleCategory.CostOptimization)
            .ToList();

        int totalPoints = 0;

        foreach (var finding in costFindings)
        {
            totalPoints += finding.Severity switch
            {
                Severity.Low => 5,
                Severity.Medium => 15,
                Severity.High => 30,
                _ => 0
            };
        }

        int score = Math.Min(100, totalPoints);

        return new FinOpsScore
        {
            Score = score,
            RiskLevel = GetRiskLevel(score),
            Summary = GenerateSummary(score, costFindings.Count)
        };
    }

    private static string GetRiskLevel(int score)
    {
        if (score < 20) return "Low";
        if (score < 50) return "Medium";
        return "High";
    }

    private static string GenerateSummary(int score, int count)
    {
        return score switch
        {
            < 20 => $"Low cost risk detected ({count} minor optimization opportunities).",
            < 50 => $"Moderate cost risk detected ({count} optimization opportunities).",
            _ => $"High cost risk detected ({count} significant cost issues)."
        };
    }
}
