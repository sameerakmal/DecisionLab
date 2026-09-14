import { useState } from "react";
import type { Conclusion, Option } from "../types/decision";

type ConclusionFormProps = {
  options: Option[];
  onAdd: (conclusion: Conclusion) => void;
};

function ConclusionForm({ options, onAdd }: ConclusionFormProps) {
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [remainingConcerns, setRemainingConcerns] = useState("");
  const [decisionDate, setDecisionDate] = useState("");

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newConclusion: Conclusion = {
      selectedOptionId,
      reasoning,
      remainingConcerns,
      decisionDate,
    };

    onAdd(newConclusion);

    setSelectedOptionId("");
    setReasoning("");
    setRemainingConcerns("");
    setDecisionDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Selected Option
        </label>

        <select
          value={selectedOptionId}
          onChange={(event) => setSelectedOptionId(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">Select an option</option>

          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Reasoning
        </label>

        <textarea
          value={reasoning}
          onChange={(event) => setReasoning(event.target.value)}
          placeholder="Why did you choose this option?"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Remaining Concerns
        </label>

        <textarea
          value={remainingConcerns}
          onChange={(event) => setRemainingConcerns(event.target.value)}
          placeholder="What concerns still remain?"
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Decision Date
        </label>

        <input
          type="date"
          value={decisionDate}
          onChange={(event) => setDecisionDate(event.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
      >
        Add Conclusion
      </button>
    </form>
  );
}

export default ConclusionForm;
