import type { Finding } from "../models/AnalysisResult";

export const groupFindingsByCategory = (findings: Finding[]) => {
  return findings.reduce<Record<number, Finding[]>>((acc, finding) => {
    acc[finding.category] = acc[finding.category] || [];
    acc[finding.category].push(finding);
    return acc;
  }, {});
};
