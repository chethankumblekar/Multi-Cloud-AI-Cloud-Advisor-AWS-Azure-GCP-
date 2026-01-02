using CloudAdvisor.Common.Models;
using CloudAdvisor.Parsers;
using Microsoft.AspNetCore.Mvc;
using CloudAdvisor.Api.Controllers.Models;
using CloudAdvisor.Ai.Interfaces;
using CloudAdvisor.Ai.Models;
using CloudAdvisor.Ai.Prompting;
using CloudAdvisor.Parsers.Azure;
using CloudAdvisor.Parsers.Gcp;
using CloudAdvisor.Parsers.Factory;
using CloudAdvisor.Common.Enums;

namespace CloudAdvisor.Api.Controllers;

[ApiController]
[Route("api/analyze")]
public class AnalysisController : ControllerBase
{
    private readonly ICloudParserFactory _parserFactory;
    private readonly RuleEngine.RuleEngine _ruleEngine;
    private readonly IAiClient _aiClient;

    public AnalysisController(
    ICloudParserFactory parserFactory,
    RuleEngine.RuleEngine ruleEngine,
    IAiClient aiClient)
    {
        _parserFactory = parserFactory;
        _ruleEngine = ruleEngine;
        _aiClient = aiClient;
    }

    [HttpPost("{cloud}/terraform")]
    public async Task<IActionResult> AnalyzeTerraform(
        string cloud,
        [FromBody] AwsTerraformRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.TerraformPlanJson))
            return BadRequest("Terraform plan JSON is required");

        if (!Enum.TryParse<CloudType>(cloud, true, out var cloudType))
            return BadRequest("Unsupported cloud type");

        var parser = _parserFactory.GetParser(cloudType);

        var environment = parser.Parse(request.TerraformPlanJson);

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
