import type { ReactNode } from "react";
import { useTheme } from "../hooks/useTheme";
import type { CloudOption } from "../models/AnalysisResult";

export default function DashboardLayout({
  title,
  subtitle,
  children,
  cloud,
  clouds,
  onCloudChange,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  cloud?: "aws" | "azure" | "gcp";
  clouds?: CloudOption[];
  onCloudChange?: (cloud: "aws" | "azure" | "gcp") => void;
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
            gap: 16,
          }}
        >
          {/* Title */}
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

          {/* Right controls */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* Cloud selector */}
            {clouds && cloud && onCloudChange && (
              <div style={{ display: "flex", gap: 8 }}>
                {clouds.map((c) => (
                  <button
                    key={c.key}
                    onClick={() => onCloudChange(c.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "6px 12px",
                      borderRadius: 8,
                      border:
                        cloud === c.key
                          ? "1px solid var(--primary)"
                          : "1px solid var(--border-default)",
                      background:
                        cloud === c.key
                          ? "var(--bg-input)"
                          : "var(--bg-card)",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: cloud === c.key ? 600 : 400,
                      color: "var(--text-primary)",
                    }}
                  >
                    <img
                      src={c.icon}
                      alt={c.label}
                      style={{
                        width: 16,
                        height: 16,
                        filter: "var(--icon-filter, none)",
                      }}
                    />
                    {c.label}
                  </button>
                ))}
              </div>
            )}

            {/* Theme toggle */}
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
