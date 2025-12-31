public class CostEstimate
{
    public decimal MonthlyUsd { get; set; }
    public string ConfidenceLevel { get; set; } = "Approximate";
    public string Assumptions { get; set; } = default!;
}
