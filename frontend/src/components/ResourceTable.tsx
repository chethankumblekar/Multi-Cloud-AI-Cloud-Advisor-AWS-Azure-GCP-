import type { CloudResource } from "../models/AnalysisResult";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";
import { Table, Th, Td } from "./ui/Table";

interface Props {
  resources: CloudResource[];
  onSelect: (resource: CloudResource) => void;
}

const CATEGORY_MAP: Record<number, string> = {
  0: "Compute",
  1: "Storage",
  2: "Database",
  3: "Network",
};

export default function ResourceTable({ resources, onSelect }: Props) {
  return (
    <Card>
      <SectionHeader title="Resources" />

      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Type</Th>
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
                background: "transparent",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg-input)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <Td>{r.id}</Td>
              <Td>{CATEGORY_MAP[r.category]}</Td>
              <Td>{r.sizeTier}</Td>
              <Td>{r.availability.region}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
