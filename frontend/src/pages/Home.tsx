import { useState } from "react";
import { analyzeTerraform } from "../api/analyzeApi";
import type { AnalysisResult, CloudOption, CloudResource, Finding } from "../models/AnalysisResult";
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
import ControlRoomLayout from "../layouts/ControlRoomLayout";
import RightPaneEmptyState from "../components/ui/RightPaneEmptyState";
import ToastContainer from "../components/ui/ToastContainer";
import type { Toast } from "../models/Toast";
import type { Cloud } from "../utils/detectCloudFromTerraform";


const clouds: CloudOption[] = [
  { key: "aws", label: "AWS", icon: awsIcon },
  { key: "azure", label: "Azure", icon: azureIcon },
  { key: "gcp", label: "GCP", icon: gcpIcon },
];


export default function Home() {
  const [showInput, setShowInput] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [cloud, setCloud] = useState<"aws" | "azure" | "gcp">("aws");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedResource, setSelectedResource] =
    useState<CloudResource | null>(null);
  const [error, setError] = useState<string | null>(null);


  function showToast(type: Toast["type"], message: string) {
  const id = crypto.randomUUID();
  setToasts((prev) => [...prev, { id, type, message }]);

  setTimeout(() => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, 4000);
}


  const analyze = async (json: string) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedResource(null);
      const data = await analyzeTerraform(cloud, json);
      setResult(data);
      setShowInput(false);
    } catch {
      setError("Failed to analyze Terraform plan.");
    } finally {
      setLoading(false);
    }
  };

  const selectedFindings: Finding[] =
    selectedResource && result
      ? result.findings.filter(
          (f) => f.resource.id === selectedResource.id
        )
      : [];

  const selectedExplanations =
    selectedResource && result
      ? result.explanations.filter(
          (_, index) =>
            result.findings[index]?.resource.id === selectedResource.id
        )
      : [];
  return (
    <DashboardLayout
      title="Multi-Cloud Architecture Advisor"
      subtitle={`Terraform-based analysis for ${cloud.toUpperCase()}`}
      cloud={cloud}
      clouds={clouds}
      onCloudChange={(c) => setCloud(c)}
    >
     

      {showInput && (
         <div
  style={{
    transition: "max-height 0.3s ease, opacity 0.2s ease",
  }}
><InputJson
  cloud={cloud}
  onAnalyze={analyze}
  loading={loading}
  onDetectCloud={(detected: Cloud) => {
  // 1. Invalid JSON
  if (detected === "invalid") {
    showToast("error", "Invalid Terraform JSON template");
    return;
  }

  // 2. Nothing detected (valid JSON but unknown structure)
  if (detected === null) {
    showToast("warning", "Could not detect cloud provider from template");
    return;
  }

  // 3. Valid cloud detected
  if (detected !== cloud) {
    setCloud(detected); // ✅ Type-safe
    showToast(
      "info",
      `Detected ${detected.toUpperCase()} Terraform template`
    );
  }
}}


/>
</div>
  
)}


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

{result && (
        <ControlRoomLayout
          /* ---------- KPI BAR ---------- */
          kpis={
            <>
              <ResourceSummary result={result} />
            </>
          }

          /* ---------- LEFT PANE ---------- */
          left={
            <div style={{ alignSelf: "start" }}>
              <FinOpsScorePanel {...result.finOpsScore}  />
              <FindingsList
                findings={result.findings}
                onSelectResource={setSelectedResource}
              />

            </div>
          }


          /* ---------- RIGHT PANE ---------- */
          right={
  selectedResource ? (
    <>
      <ResourceDetails
        resource={selectedResource}
        findings={selectedFindings}
      />

      
    </>
    
  ) : (
    <RightPaneEmptyState />
  )
}



          /* ---------- BOTTOM (COLLAPSIBLE) ---------- */
          bottom={
            <>
              <Explanations
        explanations={selectedExplanations}
        severities={selectedFindings.map((f) => f.severity)}
      />
            
            
             

              <ResourceTable
                resources={result.environment.resources}
                onSelect={setSelectedResource}
              />
            </>
          }
        />
      )}
      {!showInput && (
  <button
    onClick={() => setShowInput(true)}
    title="Edit Terraform input"
    style={{
      position: "fixed",
      bottom: 28,
      right: 28,
      width: 48,
      height: 48,
      borderRadius: "50%",
      border: "none",
      background: "var(--primary)",
      color: "#fff",
      fontSize: 20,
      cursor: "pointer",
      boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      zIndex: 100,
    }}
  >
    ✎
  </button>
      )}
      <ToastContainer
  toasts={toasts}
  onDismiss={(id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }
/>


    </DashboardLayout>
    
  );
}

