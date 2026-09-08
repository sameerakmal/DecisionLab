import { useState } from "react";
import type { Decision } from "../types/decision";
import { saveDecision } from "../utils/storage";
const CreateDecision = () => {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const now = new Date().toISOString();

    const newDecision: Decision = {
      id: crypto.randomUUID(),
      title,
      context,
      category,
      budget: Number(budget),
      status: "Researching",
      createdAt: now,
      updatedAt: now,
      options: [],
    };
    const savedDecision = saveDecision(newDecision);

    console.log(savedDecision);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white px-10 py-5">
        <h1 className="text-2xl font-bold text-gray-900">Decision Lab</h1>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Create New Decision
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-gray-200 bg-white p-8 shadow-sm"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Decision Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="What decision are you trying to make?"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="context"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Context
            </label>

            <textarea
              id="context"
              rows={4}
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Add some context about this decision..."
              className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Category
            </label>

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">Select category</option>
              <option value="Technology">Technology</option>
              <option value="Finance">Finance</option>
              <option value="Career">Career</option>
              <option value="Personal">Personal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="budget"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Budget
            </label>

            <input
              id="budget"
              type="number2"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="Enter budget amount"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Create Decision
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateDecision;
