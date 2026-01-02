
using CloudAdvisor.Parsers.Terraform.Models;

namespace CloudAdvisor.Parsers.Terraform;

public static class TerraformResourceCollector
{
    public static IEnumerable<TerraformResource> Collect(RootModule module)
    {
        foreach (var resource in module.Resources)
            yield return resource;

        foreach (var child in module.ChildModules)
        {
            foreach (var resource in Collect(child))
                yield return resource;
        }
    }
}
