import type { Finding } from "../models/AnalysisResult";
import SeverityBadge from "./SeverityBadge";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";

export default function FindingsList({ findings }: { findings: Finding[] }) {
  return (
    <Card>
      <SectionHeader title="Findings" />

      {findings.map((f, i) => (
        <div
          key={i}
          style={{
            borderLeft: `6px solid var(--severity-high)`,
            paddingLeft: 12,
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <strong style={{ color: "var(--text-primary)" }}>
              {f.title}
            </strong>
            <SeverityBadge severity={f.severity} />
          </div>

          <p style={{ color: "var(--text-secondary)", marginTop: 6 }}>
            {f.description}
          </p>
        </div>
      ))}
    </Card>
  );
}
