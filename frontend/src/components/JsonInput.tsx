import { useState } from "react";

interface Props {
  onAnalyze: (json: string) => void;
  loading?: boolean;
}

const SAMPLE_JSON = `{
  "planned_values": {
    "root_module": {
      "resources": [
        {
          "type": "aws_instance",
          "name": "web_server",
          "values": {
            "instance_type": "t3.medium",
            "availability_zone": "us-east-1a",
            "associate_public_ip_address": true
          }
        },
        {
          "type": "aws_s3_bucket",
          "name": "app_bucket",
          "values": {}
        }
      ]
    }
  }
}`;

export default function InputJson({ onAnalyze, loading = false }: Props) {
  const [json, setJson] = useState(SAMPLE_JSON);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        borderRadius: 12,
        padding: 20,
        marginBottom: 28,
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
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
          Paste the Terraform <code>plan.json</code> output to analyze your cloud
          architecture.
        </p>
      </div>

      {/* Textarea */}
      <textarea
        value={json}
        onChange={(e) => setJson(e.target.value)}
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
          outline: "none",
          resize: "vertical",
        }}
        onFocus={(e) =>
          (e.currentTarget.style.borderColor = "var(--border-focus)")
        }
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--border-default)")
        }
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
          onClick={() => setJson(SAMPLE_JSON)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--primary)",
            fontSize: 14,
            cursor: "pointer",
            padding: 0,
          }}
        >
          Load sample JSON
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => onAnalyze(json)}
          style={{
            background: loading
              ? "var(--border-default)"
              : "var(--primary)",
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
