using CloudAdvisor.Ai.Clients;
using CloudAdvisor.Ai.Interfaces;
using CloudAdvisor.Parsers;
using CloudAdvisor.Parsers.Aws;
using CloudAdvisor.RuleEngine;
using CloudAdvisor.RuleEngine.Interfaces;
using CloudAdvisor.RuleEngine.Rules.Cost;
using CloudAdvisor.RuleEngine.Rules.HighAvailability;
using CloudAdvisor.RuleEngine.Rules.Security;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// ---------- Logging ----------
builder.Host.UseSerilog((ctx, lc) =>
    lc.ReadFrom.Configuration(ctx.Configuration));

// ---------- Services ----------
builder.Services.AddControllers();
builder.Services.AddScoped<ICloudParser, AwsTerraformParser>();
builder.Services.AddScoped<IRule, SingleZoneComputeRule>();
builder.Services.AddScoped<IRule, OversizedComputeRule>();
builder.Services.AddScoped<IRule, PublicComputeRule>();

builder.Services.AddSingleton<IAiClient>(_ =>
    new OpenAiClient(builder.Configuration["OpenAI:ApiKey"]!));

builder.Services.AddScoped<RuleEngine>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ---------- CORS (for React) ----------
builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend",
        policy => policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// ---------- Middleware ----------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("frontend");
app.UseHttpsRedirection();
app.MapControllers();

app.Run();
