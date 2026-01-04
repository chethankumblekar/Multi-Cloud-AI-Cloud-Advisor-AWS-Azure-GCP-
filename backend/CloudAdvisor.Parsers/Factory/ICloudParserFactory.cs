
using CloudAdvisor.Common.Enums;
namespace CloudAdvisor.Parsers.Factory;

public interface ICloudParserFactory
{
    ICloudParser GetParser(CloudType cloud);
}
