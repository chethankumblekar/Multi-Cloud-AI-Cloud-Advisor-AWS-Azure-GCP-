import axios from "axios";

const API_BASE = "http://localhost:5189/api/analyze";

export const analyzeTerraform = async (
  cloud: "aws" | "azure" | "gcp",
  terraformJson: string
) => {
  const response = await axios.post(
    `${API_BASE}/${cloud}/terraform`,
    {
      terraformPlanJson: terraformJson,
    }
  );

  return response.data;
};
