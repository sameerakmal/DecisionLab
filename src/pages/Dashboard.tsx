import { useState, useEffect } from "react";
import type { Decision } from "../types/decision";
import { getDecisions } from "../utils/storage";
import DecisionCard from "../components/DecisionCard";
function Dashboard() {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    const savedDecisions = getDecisions();

    setDecisions(savedDecisions);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between bg-white px-10 py-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">Decision Lab</h1>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          + New Decision
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Your Decisions</h2>

            <p className="mt-2 text-sm text-gray-500">
              {decisions.length}{" "}
              {decisions.length === 1 ? "decision" : "decisions"} created
            </p>
          </div>
        </div>

        {decisions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <p className="text-gray-500">No decisions created yet.</p>
          </div>
        ) : (
          <section className="flex flex-col gap-4">
            {decisions.map((decision) => (
              <DecisionCard key={decision.id} decision={decision} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
