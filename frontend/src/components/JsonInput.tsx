interface Props {
  onAnalyze: (json: string) => void;
}

export default function JsonInput({ onAnalyze }: Props) {
  const sample = `{
  "planned_values": {
    "root_module": {
      "resources": []
    }
  }
}`;

  return (
    <div>
      <h3>Terraform Plan JSON</h3>
      <textarea
        rows={12}
        style={{ width: "100%" }}
        defaultValue={sample}
        id="jsonInput"
      />
      <button
        onClick={() =>
          onAnalyze(
            (document.getElementById("jsonInput") as HTMLTextAreaElement).value
          )
        }
      >
        Analyze
      </button>
    </div>
  );
}
