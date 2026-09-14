import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDecisions, updateDecision } from "../utils/storage";
import type { Decision, Option, Conclusion } from "../types/decision";
import OptionForm from "../components/OptionForm";
import ConclusionForm from "../components/ConclusionForm";

function DecisionDetails() {
  const { id } = useParams();
  const [decision, setDecision] = useState<Decision | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<Option[]>([]);
  const [conclusion, setConclusion] = useState<Conclusion | null>(null);

  useEffect(() => {
    const decisions = getDecisions();

    const selectedDecision = decisions.find((decision) => {
      return decision.id === id;
    });

    setDecision(selectedDecision ?? null);

    if (selectedDecision) {
      setOptions(selectedDecision.options);
    }

    setIsLoading(false);
  }, [id]);

  const handleAddOption = (option: Option) => {
    const updatedOptions = [...options, option];

    const updatedDecision: Decision = {
      ...decision!,
      options: updatedOptions,
      updatedAt: new Date().toISOString(),
    };

    updateDecision(updatedDecision);

    setDecision(updatedDecision);
    setOptions(updatedOptions);
  };

  const handleAddConclusion = (newConclusion: Conclusion) => {
    const updatedDecision: Decision = {
      ...decision!,
      conclusion: newConclusion,
      updatedAt: new Date().toISOString(),
    };

    updateDecision(updatedDecision);

    setDecision(updatedDecision);
    setConclusion(newConclusion);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-10">
        <p className="text-gray-600">Loading decision...</p>
      </div>
    );
  }

  if (!decision) {
    return (
      <div className="min-h-screen bg-gray-100 p-10">
        <p className="text-gray-600">Decision not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white px-10 py-5">
        <h1 className="text-2xl font-bold text-gray-900">Decision Lab</h1>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <Link
          to="/decisions"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-400 hover:bg-gray-50 hover:text-gray-900"
        >
          <span aria-hidden="true">←</span>
          Back to Decisions
        </Link>

        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Decision Details
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold text-gray-900">
            {decision.title}
          </h3>

          <p className="mb-6 text-gray-600">{decision.context}</p>

          <div className="space-y-4 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-gray-900">Category:</span>{" "}
              {decision.category}
            </p>

            <p>
              <span className="font-semibold text-gray-900">Budget:</span> ₹
              {decision.budget}
            </p>

            <p>
              <span className="font-semibold text-gray-900">Status:</span>{" "}
              {decision.status}
            </p>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-8">
            <h4 className="mb-4 text-xl font-semibold text-gray-900">
              Options
            </h4>

            {options.length === 0 ? (
              <p className="text-gray-600">No options added yet.</p>
            ) : (
              <div className="space-y-4">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className="rounded-lg border border-gray-200 p-5"
                  >
                    <h5 className="text-lg font-semibold text-gray-900">
                      {option.name}
                    </h5>

                    <p className="mt-2 text-gray-600">{option.description}</p>

                    <p className="mt-3 text-sm text-gray-700">
                      <span className="font-semibold">Price:</span> ₹
                      {option.price}
                    </p>

                    <a
                      href={option.referenceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      View reference
                    </a>

                    <div className="mt-6 border-t border-gray-200 pt-5">
                      <h6 className="mb-4 text-base font-semibold text-gray-900">
                        Evaluation Points
                      </h6>

                      {option.evaluationPoints.length === 0 ? (
                        <p className="text-sm text-gray-500">
                          No evaluation points added yet.
                        </p>
                      ) : (
                        <div className="space-y-4">
                          {option.evaluationPoints.map((point) => (
                            <div
                              key={point.id}
                              className="rounded-lg bg-gray-50 p-4"
                            >
                              <p className="font-medium text-gray-900">
                                {point.text}
                              </p>

                              <p className="mt-2 text-sm text-gray-600">
                                Classification: {point.classification}
                              </p>

                              <p className="text-sm text-gray-600">
                                Importance: {point.importance}
                              </p>

                              <p className="text-sm text-gray-600">
                                Confidence: {point.confidence}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-10">
              <h4 className="mb-6 text-xl font-semibold text-gray-900">
                Add Option
              </h4>

              <OptionForm onAdd={handleAddOption} />
            </div>
            <div className="mt-10 border-t border-gray-200 pt-8">
              <h4 className="mb-4 text-xl font-semibold text-gray-900">
                Conclusion
              </h4>

              {conclusion === null ? (
                <>
                  <p className="mb-6 text-gray-600">No conclusion yet.</p>

                  <ConclusionForm
                    options={options}
                    onAdd={handleAddConclusion}
                  />
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Selected Option
                    </p>

                    <p className="text-gray-600">
                      {
                        options.find(
                          (option) => option.id === conclusion.selectedOptionId,
                        )?.name
                      }
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Reasoning
                    </p>

                    <p className="text-gray-600">{conclusion.reasoning}</p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Remaining Concerns
                    </p>

                    <p className="text-gray-600">
                      {conclusion.remainingConcerns}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Decision Date
                    </p>

                    <p className="text-gray-600">{conclusion.decisionDate}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DecisionDetails;
