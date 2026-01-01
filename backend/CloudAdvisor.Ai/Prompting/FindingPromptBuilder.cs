using CloudAdvisor.Common.Enums;
using CloudAdvisor.RuleEngine.Models;

namespace CloudAdvisor.Ai.Prompting;

public static class FindingPromptBuilder
{
    public static string Build(Finding finding)
    {
        return $"""
        You are a senior cloud architect.

        Analyze the following cloud architecture issue and explain it clearly.

        Rule Category: {finding.Category}
        Severity: {finding.Severity}

        Resource:
        - Provider: {finding.Resource.Provider}
        - Service: {finding.Resource.ServiceName}
        - Region: {finding.Resource.Availability.Region}
        - Multi-Zone: {finding.Resource.Availability.IsMultiZone}
        - Publicly Accessible: {finding.Resource.Security.PubliclyAccessible}
        - Monthly Cost (USD): {finding.Resource.Cost.MonthlyUsd}

        Explain in simple terms:
        1. What is the problem
        2. Why it matters in production
        3. How to fix it (specific to the cloud provider)
        4. Cost vs reliability/security trade-offs

        Keep the explanation concise and practical.
        """;
    }
}
