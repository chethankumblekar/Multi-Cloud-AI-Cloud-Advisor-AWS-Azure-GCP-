export interface AnalysisResult {
  environment: Environment;
  findings: Finding[];
  explanations: AiExplanation[];
  finOpsScore: FinOpsScore;
}

export interface Environment {
  provider: number;
  resources: CloudResource[];
}

export interface CloudResource {
  security: any;
  availability: any;
  category: number;
  id: string;
  serviceName: string;
  sizeTier: string;
}

export interface Finding {
  resource: any;
  category: any;
  title: string;
  description: string;
  severity: number;
}

export interface AiExplanation {
  summary: string;
  recommendation: string;
}

export interface FinOpsScore {
  score: number;
  riskLevel: "Low" | "Medium" | "High";
  summary: string;
}
