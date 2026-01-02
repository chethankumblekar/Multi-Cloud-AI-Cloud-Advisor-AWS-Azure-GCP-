import ReactMarkdown from "react-markdown";
import type { AiExplanation } from "../models/AnalysisResult";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";

interface Props {
  explanations: AiExplanation[];
}

export default function Explanations({ explanations }: Props) {
  if (!explanations || explanations.length === 0) return null;

  return (
    <Card>
      <SectionHeader title="AI Recommendations" />

      {explanations.map((e, i) => (
        <div
          key={i}
          style={{
            borderLeft: "6px solid var(--primary)",
            background: "var(--bg-input)",
            padding: "14px 16px",
            borderRadius: 8,
            marginBottom: 16,
            color: "var(--text-primary)",
          }}
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h3 style={{ marginTop: 0 }}>{children}</h3>
              ),
              h2: ({ children }) => (
                <h4 style={{ marginBottom: 8 }}>{children}</h4>
              ),
              p: ({ children }) => (
                <p
                  style={{
                    marginTop: 6,
                    marginBottom: 6,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {children}
                </p>
              ),
              li: ({ children }) => (
                <li style={{ marginBottom: 4 }}>{children}</li>
              ),
            }}
          >
            {e.summary}
          </ReactMarkdown>

          {e.recommendation && (
            <div style={{ marginTop: 12 }}>
              <strong
                style={{
                  display: "block",
                  marginBottom: 6,
                  color: "var(--text-primary)",
                }}
              >
                Recommendation
              </strong>

              <ReactMarkdown
                components={{
                  p: ({ children }) => (
                    <p
                      style={{
                        marginTop: 4,
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                      }}
                    >
                      {children}
                    </p>
                  ),
                }}
              >
                {e.recommendation}
              </ReactMarkdown>
            </div>
          )}
        </div>
      ))}
    </Card>
  );
}
