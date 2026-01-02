import type { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 14,
      }}
    >
      {children}
    </table>
  );
}

export function Th({ children }: { children: ReactNode }) {
  return (
    <th
      style={{
        textAlign: "left",
        padding: "10px 12px",
        borderBottom: "1px solid var(--border-default)",
        color: "var(--text-secondary)",
        fontWeight: 500,
      }}
    >
      {children}
    </th>
  );
}

export function Td({ children }: { children: ReactNode }) {
  return (
    <td
      style={{
        padding: "10px 12px",
        borderBottom: "1px solid var(--border-default)",
        color: "var(--text-primary)",
      }}
    >
      {children}
    </td>
  );
}
