namespace CloudAdvisor.Ai.Interfaces;

public interface IAiClient
{
    Task<string> GetExplanationAsync(string prompt);
}
