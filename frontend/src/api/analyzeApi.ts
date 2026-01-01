import axios from "axios";

export const analyzeAwsTerraform = async (terraformJson: string) => {
  const response = await axios.post(
    "http://localhost:5189/api/analyze/aws/terraform",
    {
      terraformPlanJson: terraformJson
    }
  );
  return response.data;
};
