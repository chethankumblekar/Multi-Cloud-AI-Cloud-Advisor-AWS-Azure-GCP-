using CloudAdvisor.Common.Models;
using CloudAdvisor.Parsers;
using Microsoft.AspNetCore.Mvc;
using CloudAdvisor.Api.Controllers.Models;

namespace CloudAdvisor.Api.Controllers;

[ApiController]
[Route("api/analyze")]
public class AnalysisController : ControllerBase
{
    private readonly ICloudParser _parser;

    public AnalysisController(ICloudParser parser)
    {
        _parser = parser;
    }

    [HttpPost("aws/terraform")]
    public ActionResult<CloudEnvironment> AnalyzeAwsTerraform(
        [FromBody] AwsTerraformRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.TerraformPlanJson))
            return BadRequest("Terraform plan JSON is required");

        var environment = _parser.Parse(request.TerraformPlanJson);

        return Ok(environment);
    }
}
