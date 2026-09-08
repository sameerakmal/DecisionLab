import { useState, useEffect } from "react";
import type { Decision } from "../types/decision";
import { getDecisions } from "../utils/storage";
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
              <div key={decision.id} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    {decision.title}
                  </h3>

                  <p className="mb-4 text-sm text-gray-500">{decision.category}</p>

                  <div className="flex gap-5 text-sm text-gray-500">
                    <span>{decision.options.length} options</span>
                    <span>{decision.status}</span>
                    <span>Last modified: {new Date(decision.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
                    Open
                  </button>

                  <button className="rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
           ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
