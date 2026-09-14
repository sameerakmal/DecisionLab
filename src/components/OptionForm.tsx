import { useState } from "react";
import type { Option, EvaluationPoint } from "../types/decision";
import EvaluationPointForm from "./EvaluationPointForm";

type OptionFormProps = {
  onAdd: (option: Option) => void;
};

function OptionForm({ onAdd }: OptionFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [referenceUrl, setReferenceUrl] = useState("");
  const [evaluationPoints, setEvaluationPoints] = useState<EvaluationPoint[]>(
    [],
  );

  const handleSubmit = () => {

    const newOption: Option = {
      id: crypto.randomUUID(),
      name,
      description,
      price: price === "" ? undefined : Number(price),
      referenceUrl: referenceUrl === "" ? undefined : referenceUrl,
      evaluationPoints,
    };

    onAdd(newOption);

    setName("");
    setDescription("");
    setPrice("");
    setReferenceUrl("");
    setEvaluationPoints([]);
  };

  const handleAddEvaluationPoint = (point: EvaluationPoint) => {
    setEvaluationPoints((currentPoints) => [...currentPoints, point]);
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Option Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. MacBook Air"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Short description of this option"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Price
        </label>

        <input
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="e.g. 60000"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Reference URL
        </label>

        <input
          type="url"
          value={referenceUrl}
          onChange={(event) => setReferenceUrl(event.target.value)}
          placeholder="https://example.com/product"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Evaluation Points</h2>

        <EvaluationPointForm onAdd={handleAddEvaluationPoint} />
      </div>
      {evaluationPoints.length > 0 && (
        <div className="mt-6 space-y-4">
          {evaluationPoints.map((point, index) => (
            <div
              key={point.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4"
            >
              <p className="font-medium">
                {index + 1}. {point.text}
              </p>

              <p className="mt-2 text-sm text-gray-600">
                {point.classification} | {point.importance} | {point.confidence}
              </p>
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        onClick={handleSubmit}
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
      >
        Add Option
      </button>
    </div>
  );
}

export default OptionForm;
