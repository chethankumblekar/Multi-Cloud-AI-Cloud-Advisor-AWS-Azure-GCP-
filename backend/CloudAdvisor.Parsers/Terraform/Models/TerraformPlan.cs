using System.Text.Json.Serialization;

namespace CloudAdvisor.Parsers.Terraform.Models;

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

    [JsonPropertyName("child_modules")]
    public List<RootModule> ChildModules { get; set; } = new();
}

public class TerraformResource
{
    [JsonPropertyName("type")]
    public string Type { get; set; } = default!;

    [JsonPropertyName("name")]
    public string Name { get; set; } = default!;

    [JsonPropertyName("values")]
    public Dictionary<string, object> Values { get; set; } = new();
}
