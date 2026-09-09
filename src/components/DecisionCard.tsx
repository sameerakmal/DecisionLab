import type { Decision } from "../types/decision";
import { Link } from "react-router-dom";

type DecisionCardProps = {
  decision: Decision;
};

function DecisionCard({ decision }: DecisionCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <Link to={`/decisions/${decision.id}`} className="flex-1">
        <div>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            {decision.title}
          </h3>

          <p className="mb-4 text-sm text-gray-500">{decision.category}</p>

          <div className="flex gap-5 text-sm text-gray-500">
            <span>{decision.options.length} options</span>
            <span>{decision.status}</span>
            <span>
              Last modified: {new Date(decision.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex gap-3">
        <button className="rounded-lg border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
          Open
        </button>

        <button className="rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
          Delete
        </button>
      </div>
    </div>
  );
}

export default DecisionCard;
