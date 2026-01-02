import { useState } from "react";
import { analyzeAwsTerraform } from "../api/analyzeApi";
import type { AnalysisResult } from "../models/AnalysisResult";
import JsonInput from "../components/JsonInput";
import FindingsList from "../components/FindingsList";
import Explanations from "../components/Explanations";
import ResourceSummary from "../components/ResourceSummary";


export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

const analyze = async (json: string) => {
  try {
    setLoading(true);
    setError(null);
    const data = await analyzeAwsTerraform(json);
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

      <JsonInput onAnalyze={analyze} />

      {loading && <p>Analyzing architecture...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}


      {result && (
        <>
          <ResourceSummary result={result} />
          <FindingsList findings={result.findings} />
          <Explanations explanations={result.explanations} />
        </>
      )}

    </div>
  );
}
