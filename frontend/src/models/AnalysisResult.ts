export interface AnalysisResult {
  environment: Environment;
  findings: Finding[];
  explanations: AiExplanation[];
  finOpsScore: FinOpsScore;
}

export interface Environment {
  provider: CloudProvider;
  resources: CloudResource[];
}

export type CloudProvider = 0 | 1 | 2; // AWS | Azure | GCP

export interface CloudResource {
  id: string;
  serviceName: string;
  sizeTier: string;
  category: ResourceCategory;
  availability: Availability;
  security: Security;
}

export type ResourceCategory = 0 | 1 | 2 | 3; // Compute | Storage | Database | Network (etc)

export interface Availability {
  region: string;
  isMultiZone: boolean;
  availabilityZones?: number;
}

export interface Security {
  publiclyAccessible: boolean;
  encryptedAtRest?: boolean;
  usesManagedIdentity?: boolean;
}

export interface Finding {
  resource: CloudResource;
  category: RuleCategory;
  title: string;
  description: string;
  severity: Severity;
}

export type RuleCategory = number; // keep numeric to match backend enum
export type Severity = 0 | 1 | 2; // Low | Medium | High

export interface AiExplanation {
  markdown: string;
}

export interface FinOpsScore {
  score: number;
  riskLevel: "Low" | "Medium" | "High";
  summary: string;
}

export interface CloudOption {
  key: "aws" | "azure" | "gcp";
  label: string;
  icon: string;
}
