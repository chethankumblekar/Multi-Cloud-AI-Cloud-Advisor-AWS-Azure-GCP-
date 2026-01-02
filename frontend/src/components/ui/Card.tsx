import type { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-default)",
        borderRadius: 12,
        padding: 20,
        boxShadow: "var(--shadow-card)",
        marginBottom: 24,
      }}
    >
      {children}
    </div>
  );
}
