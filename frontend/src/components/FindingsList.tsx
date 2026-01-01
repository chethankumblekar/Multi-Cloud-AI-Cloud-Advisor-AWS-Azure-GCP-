import type { Finding } from "../models/AnalysisResult";
import SeverityBadge from "./SeverityBadge";
import { groupFindingsByCategory } from "../utils/groupFindings";

const categoryNames: Record<number, string> = {
  0: "High Availability",
  1: "Cost Optimization",
  2: "Security",
};

export default function FindingsList({ findings }: { findings: Finding[] }) {
  const grouped = groupFindingsByCategory(findings);

  return (
    <div>
      <h3>Findings</h3>

      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h4>{categoryNames[Number(category)]}</h4>

          {items.map((f, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #ddd",
                margin: "8px 0",
                padding: 10,
                borderRadius: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <strong>{f.title}</strong>
                <SeverityBadge severity={f.severity} />
              </div>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
