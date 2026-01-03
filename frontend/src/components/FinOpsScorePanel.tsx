import Card from "./ui/Card";

interface Props {
  score: number;
  riskLevel: "Low" | "Medium" | "High";
  summary: string;
}

const riskColorMap = {
  Low: "var(--severity-low)",
  Medium: "var(--severity-medium)",
  High: "var(--severity-high)",
};

export default function FinOpsScorePanel({
  score,
  riskLevel,
  summary,
}: Props) {
  return (
    <Card>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          gap: 24,
          alignItems: "center",
        }}
      >
        {/* KPI */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 16,
            background: riskColorMap[riskLevel],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 700 }}>{score}</div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>Cost Risk</div>
        </div>

        {/* Explanation */}
        <div>
          <div
            style={{
              fontSize: 14,
              color: "var(--text-secondary)",
              marginBottom: 4,
            }}
          >
            FinOps Overview
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 8,
              color: riskColorMap[riskLevel],
            }}
          >
            {riskLevel} Cost Risk Detected
          </div>

          <p style={{ color: "var(--text-secondary)", maxWidth: 700 }}>
            {summary}
          </p>
        </div>
      </div>
    </Card>
  );
}

