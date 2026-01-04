import type { ReactNode } from "react";

export default function ControlRoomLayout({
  kpis,
  left,
  right,
  bottom,
}: {
  kpis: ReactNode;
  left: ReactNode;
  right: ReactNode;
  bottom?: ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* KPI BAR */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "var(--bg-page)",
          paddingBottom: 8,
        }}
      >
        {kpis}
      </div>

      {/* MAIN CONTROL ROOM */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: 16,
          alignItems: "start",
          alignContent: "start",   
        }}
      >

        {/* LEFT PANE */}
        <div>{left}</div>

        {/* RIGHT PANE (context + AI) */}
        <div
          style={{
            position: "sticky",
            top: 120,
            alignSelf: "start",
          }}
        >
          {right}
        </div>
      </div>

      {/* OPTIONAL BOTTOM (collapsed sections) */}
      {bottom && <div>{bottom}</div>}
    </div>
  );
}
