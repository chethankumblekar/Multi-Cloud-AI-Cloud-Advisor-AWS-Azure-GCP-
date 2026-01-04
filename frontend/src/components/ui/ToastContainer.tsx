import type { Toast } from "../../models/Toast";

const COLORS = {
  success: "var(--severity-low)",
  warning: "var(--severity-medium)",
  error: "var(--severity-high)",
  info: "var(--primary)",
};

export default function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        zIndex: 999,
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            minWidth: 260,
            padding: "10px 14px",
            borderRadius: 8,
            background: "var(--bg-card)",
            border: `1px solid ${COLORS[t.type]}`,
            color: "var(--text-primary)",
            boxShadow: "var(--shadow-card)",
            fontSize: 13,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>{t.message}</span>

          <button
            onClick={() => onDismiss(t.id)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "var(--text-secondary)",
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
