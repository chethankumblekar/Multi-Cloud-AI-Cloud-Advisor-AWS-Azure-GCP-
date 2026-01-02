import { useState } from "react";
import { analyzeTerraform} from "../api/analyzeApi";
import type { AnalysisResult } from "../models/AnalysisResult";
import JsonInput from "../components/JsonInput";
import FindingsList from "../components/FindingsList";
import Explanations from "../components/Explanations";
import ResourceSummary from "../components/ResourceSummary";
import ResourceTable from "../components/ResourceTable";
import ResourceDetails from "../components/ResourceDetails";
import type { CloudResource } from "../models/AnalysisResult";



export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [cloud, setCloud] = useState<"aws" | "azure" | "gcp">("aws");
  const [loading, setLoading] = useState(false);
  const [selectedResource, setSelectedResource] = useState<CloudResource | null>(null);

  const [error, setError] = useState<string | null>(null);

const analyze = async (json: string) => {
  try {
    setLoading(true);
    setError(null);
    const data = await analyzeTerraform(cloud, json);
    setResult(data);
  } catch {
    setError("Failed to analyze Terraform plan.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={{ padding: 24 }}>
      <h1>Multi-Cloud AI Advisor</h1>
      <div style={{ marginBottom: 16 }}>
      <label style={{ marginRight: 12 }}>
        Cloud Provider:
      </label>

      <select
        value={cloud}
        onChange={(e) => setCloud(e.target.value as any)}
      >
        <option value="aws">AWS</option>
        <option value="azure">Azure</option>
        <option value="gcp">GCP</option>
      </select>
    </div>


      <JsonInput onAnalyze={analyze} />

      {loading && <p>Analyzing architecture...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}


      {result && (
      <>
        <ResourceSummary result={result} />

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

        <FindingsList findings={result.findings} />
        <Explanations explanations={result.explanations} />
      </>
    )}


    </div>
  );
}
