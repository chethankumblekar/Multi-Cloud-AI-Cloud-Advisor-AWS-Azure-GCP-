import type { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";

export default function DashboardLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const { toggle } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-page)",
        padding: "24px 32px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {title}
          </h1>

          <button
            onClick={toggle}
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid var(--border-default)",
              background: "var(--bg-card)",
              cursor: "pointer",
            }}
            title="Toggle dark mode"
          >
            🌙
          </button>
        </div>

        <p
          style={{
            marginTop: 6,
            fontSize: 14,
            color: "var(--text-secondary)",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>{children}</div>
    </div>
  );
}
