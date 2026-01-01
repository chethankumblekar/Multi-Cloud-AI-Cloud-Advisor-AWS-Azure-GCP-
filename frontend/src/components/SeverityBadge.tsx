interface Props {
  severity: number;
}

export default function SeverityBadge({ severity }: Props) {
  const map: Record<number, { label: string; color: string }> = {
    0: { label: "Low", color: "#4caf50" },
    1: { label: "Medium", color: "#ff9800" },
    2: { label: "High", color: "#f44336" },
  };

  const { label, color } = map[severity];

  return (
    <span
      style={{
        background: color,
        color: "white",
        padding: "4px 8px",
        borderRadius: 6,
        fontSize: 12,
        marginLeft: 8,
      }}
    >
      {label}
    </span>
  );
}
