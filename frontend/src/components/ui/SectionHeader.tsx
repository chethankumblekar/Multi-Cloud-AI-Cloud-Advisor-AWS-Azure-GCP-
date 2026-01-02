export default function SectionHeader({ title }: { title: string }) {
  return (
    <h3
      style={{
        marginBottom: 12,
        color: "var(--text-primary)",
        fontSize: 16,
      }}
    >
      {title}
    </h3>
  );
}
