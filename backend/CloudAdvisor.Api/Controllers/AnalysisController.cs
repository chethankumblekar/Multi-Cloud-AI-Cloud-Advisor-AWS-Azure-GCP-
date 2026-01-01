using CloudAdvisor.Common.Models;
using CloudAdvisor.Parsers;
using Microsoft.AspNetCore.Mvc;
using CloudAdvisor.Api.Controllers.Models;
using CloudAdvisor.Ai.Interfaces;
using CloudAdvisor.Ai.Models;
using CloudAdvisor.Ai.Prompting;

namespace CloudAdvisor.Api.Controllers;

[ApiController]
[Route("api/analyze")]
public class AnalysisController : ControllerBase
{
    private readonly ICloudParser _parser;
    private readonly RuleEngine.RuleEngine _ruleEngine;
    private readonly IAiClient _aiClient;

    public AnalysisController(
    ICloudParser parser,
    RuleEngine.RuleEngine ruleEngine,
    IAiClient aiClient)
    {
        _parser = parser;
        _ruleEngine = ruleEngine;
        _aiClient = aiClient;
    }

    [HttpPost("aws/terraform")]
    public async Task<IActionResult> AnalyzeAwsTerraform(
    [FromBody] AwsTerraformRequest request)
    {
        var environment = _parser.Parse(request.TerraformPlanJson);
        var findings = _ruleEngine.Evaluate(environment);

        var explanations = new List<AiExplanation>();

        foreach (var finding in findings)
        {
            var prompt = FindingPromptBuilder.Build(finding);
            var aiText = await _aiClient.GetExplanationAsync(prompt);

            explanations.Add(new AiExplanation
            {
                Category = finding.Category,
                Severity = finding.Severity,
                Summary = aiText,
                Recommendation = aiText
            });
        }

        return Ok(new
        {
            Environment = environment,
            Findings = findings,
            Explanations = explanations
        });
    }
}
