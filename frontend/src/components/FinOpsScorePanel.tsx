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
  const color = riskColorMap[riskLevel];

  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/* Score badge */}
        <div
          style={{
            minWidth: 56,
            height: 56,
            borderRadius: 12,
            background: color + "20", // soft tint
            color: color,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
          }}
        >
          <div style={{ fontSize: 20 }}>{score}</div>
          <div style={{ fontSize: 10, fontWeight: 500 }}>
            Risk
          </div>
        </div>

        {/* Text */}
        <div>
          <div
            style={{
              fontSize: 12,
              color: "var(--text-secondary)",
              marginBottom: 2,
            }}
          >
            FinOps Overview
          </div>

          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color,
              marginBottom: 4,
            }}
          >
            {riskLevel} Cost Risk
          </div>

          <p
            style={{
              fontSize: 13,
              color: "var(--text-secondary)",
              margin: 0,
              lineHeight: 1.4,
              maxWidth: 520,
            }}
          >
            {summary}
          </p>
        </div>
      </div>
    </Card>
  );
}
