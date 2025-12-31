public class CloudResource
{
    public string Id { get; set; } = default!;
    public CloudProvider Provider { get; set; }
    public ResourceCategory Category { get; set; }
    public string ServiceName { get; set; } = default!; // EC2 / VM / GCE (only for reference)
    public string SizeTier { get; set; } = default!;     // small / medium / large

    public AvailabilityProfile Availability { get; set; } = new();
    public SecurityProfile Security { get; set; } = new();
    public CostEstimate Cost { get; set; } = new();
}
