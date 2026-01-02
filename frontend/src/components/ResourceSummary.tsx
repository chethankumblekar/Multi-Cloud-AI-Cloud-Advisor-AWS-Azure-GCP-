import type { AnalysisResult } from "../models/AnalysisResult";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";
import StatCard from "./ui/StatCard";

interface Props {
  result: AnalysisResult;
}

export default function ResourceSummary({ result }: Props) {
  const totalResources = result.environment.resources.length;

  const computeCount = result.environment.resources.filter(
    (r) => r.category === 0
  ).length;

  const storageCount = result.environment.resources.filter(
    (r) => r.category === 1
  ).length;

  const highRisk = result.findings.filter((f) => f.severity === 2).length;
  const mediumRisk = result.findings.filter((f) => f.severity === 1).length;
  const lowRisk = result.findings.filter((f) => f.severity === 0).length;

  return (
    <Card>
      <SectionHeader title="Resource Summary" />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
        }}
      >
        <StatCard label="Total Resources" value={totalResources} />
        <StatCard label="Compute" value={computeCount} />
        <StatCard label="Storage" value={storageCount} />

        <StatCard
          label="High Risk"
          value={highRisk}
          accent="var(--severity-high)"
        />
        <StatCard
          label="Medium Risk"
          value={mediumRisk}
          accent="var(--severity-medium)"
        />
        <StatCard
          label="Low Risk"
          value={lowRisk}
          accent="var(--severity-low)"
        />
      </div>
    </Card>
  );
}
