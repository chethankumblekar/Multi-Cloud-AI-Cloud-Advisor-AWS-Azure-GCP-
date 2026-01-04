using CloudAdvisor.Ai.Interfaces;
using OpenAI.Chat;

namespace CloudAdvisor.Ai.Clients;

public class OpenAiClient : IAiClient
{
    private readonly ChatClient _chatClient;

    public OpenAiClient(string apiKey)
    {
        _chatClient = new ChatClient("gpt-4o-mini", apiKey);
    }

    public async Task<string> GetExplanationAsync(string prompt)
    {
        var response = await _chatClient.CompleteChatAsync(prompt);
        return response.Value.Content[0].Text;
    }
}
