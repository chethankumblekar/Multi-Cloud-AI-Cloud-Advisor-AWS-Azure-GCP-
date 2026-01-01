using System.Text.Json.Serialization;

namespace CloudAdvisor.Parsers.Aws.Models;

public class TerraformPlan
{
    [JsonPropertyName("planned_values")]
    public PlannedValues PlannedValues { get; set; } = new();
}

public class PlannedValues
{
    [JsonPropertyName("root_module")]
    public RootModule RootModule { get; set; } = new();
}

public class RootModule
{
    [JsonPropertyName("resources")]
    public List<TerraformResource> Resources { get; set; } = new();
}

public class TerraformResource
{
    public string Type { get; set; } = default!;
    public string Name { get; set; } = default!;
    public Dictionary<string, object> Values { get; set; } = new();
}
