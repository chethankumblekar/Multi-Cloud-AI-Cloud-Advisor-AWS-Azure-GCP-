import type { CloudResource, Finding } from "../models/AnalysisResult";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";
import SeverityBadge from "./SeverityBadge";

interface Props {
  resource: CloudResource;
  findings: Finding[];
}

export default function ResourceDetails({ resource, findings }: Props) {
  const relatedFindings = findings.filter(
    (f) => f.resource.id === resource.id
  );

  return (
    <Card>
      <SectionHeader title={`Resource: ${resource.id}`} />

      <div style={{ marginBottom: 12 }}>
        <strong>Service:</strong> {resource.serviceName}
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Size:</strong> {resource.sizeTier}
      </div>
      <div style={{ marginBottom: 12 }}>
        <strong>Region:</strong> {resource.availability.region}
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Availability:</strong>{" "}
        {resource.availability.isMultiZone ? "Multi-Zone" : "Single-Zone"}
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Public Access:</strong>{" "}
        {resource.security.publiclyAccessible ? "Yes" : "No"}
      </div>

      <div style={{ marginTop: 20 }}>
        <h4>Related Findings</h4>

        {relatedFindings.length === 0 && (
          <p style={{ color: "var(--text-secondary)" }}>
            No findings for this resource.
          </p>
        )}

        {relatedFindings.map((f, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <strong>{f.title}</strong>
              <SeverityBadge severity={f.severity} />
            </div>
            <p style={{ color: "var(--text-secondary)" }}>{f.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
