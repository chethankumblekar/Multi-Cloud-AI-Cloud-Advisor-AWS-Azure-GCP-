import type { CloudResource, Finding } from "../models/AnalysisResult";
import Card from "./ui/Card";
import SectionHeader from "./ui/SectionHeader";
import SeverityBadge from "./SeverityBadge";

interface Props {
  resource: CloudResource;
  findings: Finding[];
}

export default function ResourceDetails({ resource, findings }: Props) {
  const relatedFindings = findings.filter((f) => f.resource.id === resource.id);

  return (
    <Card>
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <SectionHeader title={`Resource: ${resource.id}`} />

        <div
          style={{
            fontSize: 13,
            color: "var(--text-secondary)",
            marginTop: 4,
          }}
        >
          {resource.serviceName} • {resource.availability.region} •{" "}
          {resource.category === 0 ? "Compute" : "Resource"}
        </div>
      </div>

      {/* Configuration */}
      <div style={{ marginBottom: 24 }}>
        <h4
          style={{
            marginBottom: 12,
            fontSize: 14,
            color: "var(--text-primary)",
          }}
        >
          Configuration
        </h4>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "160px 1fr",
            rowGap: 10,
            columnGap: 12,
            fontSize: 14,
          }}
        >
          <Label>Service</Label>
          <Value>{resource.serviceName}</Value>

          <Label>Size</Label>
          <Value>{resource.sizeTier}</Value>

          <Label>Region</Label>
          <Value>{resource.availability.region}</Value>

          <Label>Availability</Label>
          <Value>
            {resource.availability.isMultiZone ? (
              <span style={{ color: "var(--severity-low)" }}>Multi-Zone</span>
            ) : (
              <span style={{ color: "var(--severity-medium)" }}>
                Single-Zone
              </span>
            )}
          </Value>

          <Label>Public Access</Label>
          <Value>
            {resource.security.publiclyAccessible ? (
              <span style={{ color: "var(--severity-high)" }}>Yes</span>
            ) : (
              <span style={{ color: "var(--severity-low)" }}>No</span>
            )}
          </Value>
        </div>
      </div>

      {/* Findings */}
      <div>
        <h4
          style={{
            marginBottom: 12,
            fontSize: 14,
            color: "var(--text-primary)",
          }}
        >
          Related Findings ({relatedFindings.length})
        </h4>

        {relatedFindings.length === 0 && (
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
            No findings associated with this resource.
          </p>
        )}

        {relatedFindings.map((f, i) => (
          <div
            key={i}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              background: "var(--bg-input)",
              marginBottom: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <strong style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                {f.title}
              </strong>
              <SeverityBadge severity={f.severity} />
            </div>

            <p
              style={{
                marginTop: 6,
                fontSize: 13,
                color: "var(--text-secondary)",
                lineHeight: 1.5,
              }}
            >
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------- Small UI helpers ---------- */

function Label({ children }: { children: string }) {
  return (
    <div
      style={{
        color: "var(--text-secondary)",
        fontSize: 13,
      }}
    >
      {children}
    </div>
  );
}

function Value({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        color: "var(--text-primary)",
        fontWeight: 500,
      }}
    >
      {children}
    </div>
  );
}
