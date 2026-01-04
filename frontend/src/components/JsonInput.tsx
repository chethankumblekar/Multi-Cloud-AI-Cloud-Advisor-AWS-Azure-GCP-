import { useEffect, useState } from "react";
import { TERRAFORM_SAMPLES } from "../samples/terraformSamples";
import {
  detectCloudFromTerraform,
  type Cloud,
} from "../utils/detectCloudFromTerraform";

interface Props {
  cloud: "aws" | "azure" | "gcp";
  onAnalyze: (json: string) => void;
  onDetectCloud?: (cloud: Cloud) => void;
  loading?: boolean;
}

export default function InputJson({
  cloud,
  onAnalyze,
  onDetectCloud,
  loading = false,
}: Props) {
  const [json, setJson] = useState(TERRAFORM_SAMPLES[cloud]);

  /* Load sample automatically when cloud changes */
  useEffect(() => {
    setJson(TERRAFORM_SAMPLES[cloud]);
  }, [cloud]);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        borderRadius: 12,
        padding: 20,
        marginBottom: 28,
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <h2
          style={{
            margin: 0,
            fontSize: 18,
            color: "var(--text-primary)",
          }}
        >
          Terraform Plan Input
        </h2>

        <p
          style={{
            marginTop: 6,
            fontSize: 14,
            color: "var(--text-secondary)",
          }}
        >
          Paste the Terraform <code>plan.json</code> output or load a{" "}
          <strong>{cloud.toUpperCase()}</strong> sample.
        </p>
      </div>

      {/* Textarea */}
      <textarea
        value={json}
        onChange={(e) => {
          const value = e.target.value;
          setJson(value);
          const detected = detectCloudFromTerraform(value);

          if (detected === "invalid") {
            onDetectCloud?.("invalid" as any);
          } else if (detected && detected !== cloud) {
            onDetectCloud?.(detected);
          }
        }}
        rows={14}
        spellCheck={false}
        style={{
          width: "100%",
          boxSizing: "border-box",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: 13,
          lineHeight: 1.5,
          color: "var(--text-primary)",
          background: "var(--bg-input)",
          padding: 14,
          borderRadius: 8,
          border: "1px solid var(--border-default)",
          resize: "vertical",
        }}
      />

      {/* Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <button
          type="button"
          onClick={() => setJson(TERRAFORM_SAMPLES[cloud])}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--primary)",
            fontSize: 14,
            cursor: "pointer",
            padding: 0,
          }}
        >
          Load {cloud.toUpperCase()} sample
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => onAnalyze(json)}
          style={{
            background: loading ? "var(--border-default)" : "var(--primary)",
            color: "#ffffff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Analyzing…" : "Analyze Architecture"}
        </button>
      </div>
    </div>
  );
}
