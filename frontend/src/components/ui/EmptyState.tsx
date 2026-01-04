export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: 48,
        color: "var(--text-secondary)",
      }}
    >
      <div style={{ fontSize: 48 }}>📊</div>
      <h3 style={{ color: "var(--text-primary)" }}>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
