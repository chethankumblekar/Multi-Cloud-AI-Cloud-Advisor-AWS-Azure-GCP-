public class AvailabilityProfile
{
    public bool IsMultiZone { get; set; }
    public int AvailabilityZones { get; set; }
    public string Region { get; set; } = default!;
}
