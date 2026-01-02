interface Props {
  label: string;
  value: number | string;
  accent?: string;
}

export default function StatCard({ label, value, accent }: Props) {
  return (
    <div
      style={{
        flex: 1,
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        borderRadius: 10,
        padding: 16,
        boxShadow: "var(--shadow-card)",
        borderLeft: accent ? `6px solid ${accent}` : undefined,
      }}
    >
      <div
        style={{
          fontSize: 13,
          color: "var(--text-secondary)",
          marginBottom: 6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: "var(--text-primary)",
        }}
      >
        {value}
      </div>
    </div>
  );
}
