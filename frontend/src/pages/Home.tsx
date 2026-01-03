import { useState } from "react";
import { analyzeTerraform } from "../api/analyzeApi";
import type { AnalysisResult, CloudResource } from "../models/AnalysisResult";
import DashboardLayout from "../layouts/DashboardLayout";
import InputJson from "../components/JsonInput";
import FinOpsScorePanel from "../components/FinOpsScorePanel";
import ResourceSummary from "../components/ResourceSummary";
import FindingsList from "../components/FindingsList";
import ResourceTable from "../components/ResourceTable";
import ResourceDetails from "../components/ResourceDetails";
import Explanations from "../components/Explanations";
import EmptyState from "../components/ui/EmptyState";
import awsIcon from "../assets/aws.svg";
import azureIcon from "../assets/azure.svg";
import gcpIcon from "../assets/gcp.svg";

const clouds = [
  { key: "aws", label: "AWS", icon: awsIcon },
  { key: "azure", label: "Azure", icon: azureIcon },
  { key: "gcp", label: "GCP", icon: gcpIcon },
];


export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [cloud, setCloud] = useState<"aws" | "azure" | "gcp">("aws");
  const [loading, setLoading] = useState(false);
  const [selectedResource, setSelectedResource] =
    useState<CloudResource | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (json: string) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedResource(null);
      const data = await analyzeTerraform(cloud, json);
      setResult(data);
    } catch {
      setError("Failed to analyze Terraform plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title="Multi-Cloud Architecture Advisor"
      subtitle={`Terraform-based analysis for ${cloud.toUpperCase()}`}
    >
      <div
    style={{
      display: "flex",
      gap: 12,
      alignItems: "center",
      marginBottom: 24,
    }}
  >
    <span
      style={{
        fontSize: 14,
        color: "var(--text-secondary)",
        marginRight: 8,
      }}
    >
      Cloud Provider
    </span>

    {clouds.map((c) => (
      <button
        key={c.key}
        onClick={() => setCloud(c.key as any)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 14px",
          borderRadius: 10,
          border:
            cloud === c.key
              ? "1px solid var(--primary)"
              : "1px solid var(--border-default)",
          background:
            cloud === c.key
              ? "var(--bg-input)"
              : "var(--bg-card)",
          cursor: "pointer",
          fontSize: 14,
          fontWeight: cloud === c.key ? 600 : 400,
          color: "var(--text-primary)"
        }}
      >
        <img
          src={c.icon}
          alt={c.label}
          style={{
            width: 18,
            height: 18,
            filter: "var(--icon-filter, none)",
          }}
        />
        {c.label}
      </button>
    ))}
</div>

<InputJson onAnalyze={analyze} loading={loading} />

{/* Status */}
{loading && (
  <p style={{ color: "var(--text-secondary)", marginBottom: 16 }}>
    Analyzing architecture…
  </p>
)}

{error && (
  <p style={{ color: "var(--severity-high)", marginBottom: 16 }}>
    {error}
  </p>
)}

{/* Empty state */}
{!result && !loading && !error && (
  <EmptyState
    title="Analyze your Terraform architecture"
    description="Paste a Terraform plan and select a cloud provider to get started."
  />
)}

{/* Results */}
{result && (
  <>
    <FinOpsScorePanel {...result.finOpsScore} />

    <ResourceSummary result={result} />

    <FindingsList findings={result.findings} />

    <ResourceTable
      resources={result.environment.resources}
      onSelect={setSelectedResource}
    />

    {selectedResource && (
      <ResourceDetails
        resource={selectedResource}
        findings={result.findings}
      />
    )}

    <Explanations explanations={result.explanations} />
  </>
)}
    </DashboardLayout>
  );
}
