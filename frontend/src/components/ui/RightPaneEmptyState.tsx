
import Card from "./Card";

export default function RightPaneEmptyState() {
  return (
    <Card>
      <div
        style={{
          padding: 24,
          textAlign: "center",
          color: "var(--text-secondary)",
        }}
      >
        <div style={{ fontSize: 40, marginBottom: 12 }}>🧭</div>

        <h4 style={{ color: "var(--text-primary)", marginBottom: 8 }}>
          No resource selected
        </h4>

        <p style={{ fontSize: 14, lineHeight: 1.5 }}>
          Select a finding on the left or a resource from the inventory
          to view configuration details and AI-powered recommendations.
        </p>
      </div>
    </Card>
  );
}
