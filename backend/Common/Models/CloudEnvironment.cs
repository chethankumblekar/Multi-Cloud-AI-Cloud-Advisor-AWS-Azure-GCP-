namespace CloudAdvisor.Common.Models;

public class CloudEnvironment
{
    public CloudProvider Provider { get; set; }
    public List<CloudResource> Resources { get; set; } = new();
}
