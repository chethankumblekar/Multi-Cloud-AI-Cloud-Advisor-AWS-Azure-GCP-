using CloudAdvisor.Common.Models;

namespace CloudAdvisor.Parsers;

public interface ICloudParser
{
    CloudEnvironment Parse(string terraformPlanJson);
}
