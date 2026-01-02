interface Props {
  children: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ children, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: disabled ? "var(--border-default)" : "var(--primary)",
        color: "#fff",
        border: "none",
        padding: "10px 18px",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
}
