import { useState } from "react";
import type { SyntheticEvent } from "react";
import type { EvaluationPoint } from "../types/decision";

type EvaluationPointFormProps = {
  onAdd: (point: EvaluationPoint) => void;
};

function EvaluationPointForm({ onAdd }: EvaluationPointFormProps) {

  const [text, setText] = useState("");
  const [classification, setClassification] =
    useState<EvaluationPoint["classification"]>("Unsure");
  const [importance, setImportance] =
    useState<EvaluationPoint["importance"]>("Medium");
  const [confidence, setConfidence] =
    useState<EvaluationPoint["confidence"]>("Medium");

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newPoint: EvaluationPoint = {
      id: crypto.randomUUID(),
      text,
      classification,
      importance,
      confidence,
      order: 0,
    };
    onAdd(newPoint);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Evaluation Point
        </label>

        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="e.g. Fuel efficiency"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Classification
        </label>

        <select
          value={classification}
          onChange={(event) =>
            setClassification(
              event.target.value as EvaluationPoint["classification"],
            )
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="Positive">Positive</option>
          <option value="Unsure">Unsure</option>
          <option value="Negative">Negative</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Importance
        </label>

        <select
          value={importance}
          onChange={(event) =>
            setImportance(event.target.value as EvaluationPoint["importance"])
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Confidence
        </label>

        <select
          value={confidence}
          onChange={(event) =>
            setConfidence(event.target.value as EvaluationPoint["confidence"])
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
      >
        Add Evaluation Point
      </button>
    </form>
  );
}

export default EvaluationPointForm;
