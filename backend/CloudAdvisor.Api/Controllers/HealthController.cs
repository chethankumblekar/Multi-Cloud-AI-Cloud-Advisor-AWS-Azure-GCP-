using Microsoft.AspNetCore.Mvc;

namespace CloudAdvisor.Api.Controllers;

[ApiController]
[Route("api/health")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { status = "CloudAdvisor API running" });
    }
}
