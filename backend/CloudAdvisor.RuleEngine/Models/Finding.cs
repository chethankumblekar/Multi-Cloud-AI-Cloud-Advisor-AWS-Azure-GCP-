using CloudAdvisor.Common.Models;

namespace CloudAdvisor.RuleEngine.Models;

public class Finding
{
    public RuleCategory Category { get; set; }
    public Severity Severity { get; set; }

    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;

    public CloudResource Resource { get; set; } = default!;
}
