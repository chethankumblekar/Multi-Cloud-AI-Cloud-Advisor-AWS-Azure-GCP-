import { useMemo, useState } from "react";
import type { Finding, CloudResource } from "../models/AnalysisResult";
import Card from "./ui/Card";
import SeverityBadge from "./SeverityBadge";

interface Props {
  findings: Finding[];
  onSelectResource: (resource: CloudResource) => void;
}

type SeverityTab = "High" | "Medium" | "Low";

export default function FindingsList({ findings, onSelectResource }: Props) {
  const [activeTab, setActiveTab] = useState<SeverityTab>("High");

  const grouped = useMemo(() => {
    return {
      High: findings.filter((f) => f.severity === 2),
      Medium: findings.filter((f) => f.severity === 1),
      Low: findings.filter((f) => f.severity === 0),
    };
  }, [findings]);

  const current = grouped[activeTab];

  return (
    <Card>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h4
          style={{
            margin: 0,
            color: "var(--text-primary)",
            fontWeight: 600,
          }}
        >
          Findings
        </h4>

        <span
          style={{
            fontSize: 12,
            color: "var(--text-secondary)",
          }}
        >
          {current.length} issues
        </span>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 12,
        }}
      >
        {(["High", "Medium", "Low"] as SeverityTab[]).map((tab) => {
          const count = grouped[tab].length;
          const active = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                border: active
                  ? "1px solid var(--primary)"
                  : "1px solid var(--border-default)",
                background: active
                  ? "var(--bg-input)"
                  : "var(--bg-card)",
                color: active
                  ? "var(--text-primary)"
                  : "var(--text-secondary)",
                fontSize: 13,
                fontWeight: active ? 600 : 500,
                cursor: "pointer",
              }}
            >
              {tab} ({count})
            </button>
          );
        })}
      </div>

      {/* Scrollable List */}
      <div
        style={{
          maxHeight: "42vh",
          minHeight: 240,
          overflowY: "auto",
          paddingRight: 4,
        }}
      >
        {current.length === 0 && (
          <p
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              padding: 8,
            }}
          >
            No {activeTab.toLowerCase()} severity findings.
          </p>
        )}

        {current.map((f, i) => (
          <div
            key={i}
            onClick={() => onSelectResource(f.resource)}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              background: "var(--bg-input)",
              marginBottom: 8,
              cursor: "pointer",
              border: "1px solid var(--border-default)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 4,
              }}
            >
              <strong
                style={{
                  fontSize: 13,
                  color: "var(--text-primary)",
                }}
              >
                {f.title}
              </strong>

              <SeverityBadge severity={f.severity} />
            </div>

            <div
              style={{
                fontSize: 12,
                color: "var(--text-secondary)",
              }}
            >
              {f.resource.serviceName} • {f.resource.id}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
