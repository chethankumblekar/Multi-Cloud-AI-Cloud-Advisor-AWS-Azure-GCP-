using CloudAdvisor.Common.Enums;
using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.Ai.Prompting;

public static class FindingPromptBuilder
{
    public static string Build(
        Finding finding,
        FinOpsScore finOpsScore)
    {
        return $"""
You are a senior cloud architect and FinOps advisor.

Overall environment cost context:
- FinOps Cost Risk Score: {finOpsScore.Score}/100
- Risk Level: {finOpsScore.RiskLevel}
- Summary: {finOpsScore.Summary}

Analyze the following cloud architecture issue in this context.

Rule Category: {finding.Category}
Severity: {finding.Severity}

Affected Resource:
- Provider: {finding.Resource.Provider}
- Service: {finding.Resource.ServiceName}
- Region: {finding.Resource.Availability.Region}
- Multi-Zone: {finding.Resource.Availability.IsMultiZone}
- Publicly Accessible: {finding.Resource.Security.PubliclyAccessible}
- Monthly Cost (USD): {finding.Resource.Cost.MonthlyUsd}

Explain clearly:
1. What the problem is
2. Why it matters in production and cost efficiency
3. How to fix it (cloud-agnostic where possible, provider-specific only if necessary)
4. Cost vs reliability/security trade-offs
5. Priority of this fix given the overall FinOps risk

Use concise, practical Markdown. Avoid generic advice.
""";
    }
}
