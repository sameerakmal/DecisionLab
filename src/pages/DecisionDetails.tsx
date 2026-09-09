import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDecisions } from "../utils/storage";
import type { Decision } from "../types/decision";

function DecisionDetails() {
  const { id } = useParams();
  const [decision, setDecision] = useState<Decision | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const decisions = getDecisions();

    const selectedDecision = decisions.find((decision) => {
      return decision.id === id;
    });

    setDecision(selectedDecision ?? null);
    setIsLoading(false);
  }, [id]);

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
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Decision Details
        </h2>

        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <p className="text-sm text-gray-500">Decision ID:</p>

          <p className="mt-2 text-lg font-semibold text-gray-900">{id}</p>
        </div>
      </main>
    </div>
  );
}

export default DecisionDetails;
