import { useState } from "react";
import type { AiExplanation } from "../models/AnalysisResult";
import Card from "./ui/Card";
import SeverityBadge from "./SeverityBadge";

import ReactMarkdown from "react-markdown";

interface Props {
  explanations: AiExplanation[];
  severities?: number[];
}

export default function Explanations({ explanations, severities = [] }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (explanations.length === 0) {
    return null;
  }

  return (
    <Card>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: expanded ? 12 : 0,
        }}
      >
        <h4
          style={{
            margin: 0,
            color: "var(--text-primary)",
            fontWeight: 600,
          }}
        >
          AI Insights
        </h4>

        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            fontSize: 12,
            border: "none",
            background: "transparent",
            color: "var(--primary)",
            cursor: "pointer",
          }}
        >
          {expanded ? "Hide" : "Show"}
        </button>
      </div>

      {/* Body */}
      {expanded && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {explanations.map((e, i) => (
            <div
              key={i}
              style={{
                padding: "12px 14px",
                borderRadius: 8,
                background: "var(--bg-input)",
                border: "1px solid var(--border-default)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <strong
                  style={{
                    fontSize: 13,
                    color: "var(--text-primary)",
                  }}
                >
                  Recommendation
                </strong>

                {severities[i] !== undefined && (
                  <SeverityBadge severity={severities[i]} />
                )}
              </div>

              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p style={{ margin: "6px 0" }}>{children}</p>
                    ),
                    ul: ({ children }) => (
                      <ul style={{ paddingLeft: 18, margin: "6px 0" }}>
                        {children}
                      </ul>
                    ),
                    li: ({ children }) => (
                      <li style={{ marginBottom: 4 }}>{children}</li>
                    ),
                    strong: ({ children }) => (
                      <strong style={{ color: "var(--text-primary)" }}>
                        {children}
                      </strong>
                    ),
                    code: ({ children }) => (
                      <code
                        style={{
                          background: "var(--bg-card)",
                          color: "var(--text-primary)",
                          padding: "2px 6px",
                          borderRadius: 4,
                          fontSize: 12,
                          border: "1px solid var(--border-default)",
                        }}
                      >
                        {children}
                      </code>
                    ),
                  }}
                >
                  {e.markdown}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
