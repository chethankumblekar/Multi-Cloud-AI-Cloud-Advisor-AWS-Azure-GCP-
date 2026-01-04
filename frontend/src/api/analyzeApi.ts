import { API_BASE_URL } from "../config/api";

export async function analyzeTerraform(
  cloud: "aws" | "azure" | "gcp",
  json: string
) {
  const res = await fetch(
    `${API_BASE_URL}/api/analyze/${cloud}/terraform`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        terraformPlanJson: json,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Analysis failed");
  }

  return res.json();
}
