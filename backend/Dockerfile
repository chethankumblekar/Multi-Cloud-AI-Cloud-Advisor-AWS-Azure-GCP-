# ---------- Build stage ----------
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY *.sln .
COPY CloudAdvisor.Api/*.csproj CloudAdvisor.Api/
COPY CloudAdvisor.Parsers/*.csproj CloudAdvisor.Parsers/
COPY CloudAdvisor.RuleEngine/*.csproj CloudAdvisor.RuleEngine/
COPY CloudAdvisor.Ai/*.csproj CloudAdvisor.Ai/
COPY CloudAdvisor.Common/*.csproj CloudAdvisor.Common/

RUN dotnet restore

COPY . .
WORKDIR /app/CloudAdvisor.Api
RUN dotnet publish -c Release -o /out

# ---------- Runtime stage ----------
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /out .

ENV ASPNETCORE_URLS=http://0.0.0.0:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "CloudAdvisor.Api.dll"]
