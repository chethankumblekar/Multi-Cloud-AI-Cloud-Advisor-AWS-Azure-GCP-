import { useState } from "react";
import type { CloudResource } from "../models/AnalysisResult";
import Card from "./ui/Card";
import { Table, Th, Td } from "./ui/Table";

interface Props {
  resources: CloudResource[];
  onSelect: (resource: CloudResource) => void;
}

/* ---------- Category Resolver (extensible) ---------- */
const CATEGORY_MAP: Record<number, string> = {
  0: "Compute",
  1: "Storage",
  2: "Database",
  3: "Network",
};

function resolveCategory(category?: number) {
  return CATEGORY_MAP[category ?? -1] ?? "Other";
}

export default function ResourceTable({ resources, onSelect }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: expanded ? 12 : 0,
        }}
      >
        <h4
          style={{
            margin: 0,
            color: "var(--text-primary)",
            fontWeight: 600,
          }}
        >
          Resource Inventory
        </h4>

        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            fontSize: 12,
            border: "none",
            background: "transparent",
            color: "var(--primary)",
            cursor: "pointer",
          }}
        >
          {expanded ? "Hide" : "Show"}
        </button>
      </div>

      {/* Body */}
      {expanded && (
        <div style={{ marginTop: 8 }}>
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Category</Th>
                <Th>Service</Th>
                <Th>Size</Th>
                <Th>Region</Th>
              </tr>
            </thead>

            <tbody>
              {resources.map((r) => (
                <tr
                  key={r.id}
                  onClick={() => onSelect(r)}
                  style={{
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "var(--bg-input)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <Td>
                    {r.id}
                  </Td>

                  <Td >
                    {resolveCategory(r.category)}
                  </Td>

                  <Td >
                    {r.serviceName}
                  </Td>

                  <Td >
                    {r.sizeTier}
                  </Td>

                  <Td >
                    {r.availability.region}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Card>
  );
}
