import axios from "axios";
import type { Cloud } from "../utils/detectCloudFromTerraform";

const API_BASE = "http://localhost:5189/api/analyze";

export const analyzeTerraform = async (
  cloud: Cloud,
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
