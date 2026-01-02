using CloudAdvisor.Common.Enums;
using CloudAdvisor.Parsers.Aws;
using CloudAdvisor.Parsers.Azure;
using CloudAdvisor.Parsers.Gcp;

namespace CloudAdvisor.Parsers.Factory;

public class CloudParserFactory : ICloudParserFactory
{
    private readonly AwsTerraformParser _aws;
    private readonly AzureTerraformParser _azure;
    private readonly GcpTerraformParser _gcp;

    public CloudParserFactory(
        AwsTerraformParser aws,
        AzureTerraformParser azure,
        GcpTerraformParser gcp)
    {
        _aws = aws;
        _azure = azure;
        _gcp = gcp;
    }

    public ICloudParser GetParser(CloudType cloud)
    {
        return cloud switch
        {
            CloudType.Aws => _aws,
            CloudType.Azure => _azure,
            CloudType.Gcp => _gcp,
            _ => throw new NotSupportedException($"Cloud {cloud} not supported")
        };
    }
}
