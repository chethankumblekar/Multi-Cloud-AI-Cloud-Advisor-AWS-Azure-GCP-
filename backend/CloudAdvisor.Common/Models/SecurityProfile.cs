namespace CloudAdvisor.Common.Models;

public class SecurityProfile
{
    public bool PubliclyAccessible { get; set; }
    public bool EncryptedAtRest { get; set; }
    public bool UsesManagedIdentity { get; set; }
}
