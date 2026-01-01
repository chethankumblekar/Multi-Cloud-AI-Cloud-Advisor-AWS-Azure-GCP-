import ReactMarkdown from "react-markdown";
import type { AiExplanation } from "../models/AnalysisResult";

export default function Explanations({
  explanations,
}: {
  explanations: AiExplanation[];
}) {
  return (
    <div>
      <h3>AI Recommendations</h3>

      {explanations.map((e, i) => (
        <div
          key={i}
          style={{
            borderLeft: "6px solid #2196f3",
            margin: "16px 0",
            padding: 16,
            borderRadius: 6,
          }}
        >
          {/* Summary as Markdown */}
          <ReactMarkdown>{e.summary}</ReactMarkdown>

          {/* Recommendation as Markdown */}
          <div style={{ marginTop: 12 }}>
            <strong>Recommendation</strong>
            <ReactMarkdown>{e.recommendation}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}
