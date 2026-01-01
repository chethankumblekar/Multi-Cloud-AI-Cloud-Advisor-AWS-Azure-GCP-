import { useEffect, useState } from "react";
import { api } from "../api/cloudAdvisorApi";

export default function Home() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/health")
      .then(res => setStatus(res.data.status))
      .catch(() => setStatus("API not reachable"));
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Multi-Cloud AI Advisor</h1>
      <p>{status}</p>
    </div>
  );
}
