export type Cloud = "aws" | "azure" | "gcp" | "invalid" | null;

export function detectCloudFromTerraform(json: string): Cloud {
  try {
    const parsed = JSON.parse(json);

    const resources = parsed?.planned_values?.root_module?.resources;

    if (!Array.isArray(resources)) {
      return null;
    }

    const types = resources.map((r: any) => r.type);

    if (types.some((t: string) => t.startsWith("aws_"))) return "aws";
    if (types.some((t: string) => t.startsWith("azurerm_"))) return "azure";
    if (types.some((t: string) => t.startsWith("google_"))) return "gcp";

    return null;
  } catch {
    return "invalid";
  }
}
