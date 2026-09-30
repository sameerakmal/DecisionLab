import type { EvaluationPoint, Option } from "../types/decision";

type ComparisonViewProps = {
  options: Option[];
};

const classificationScores: Record<EvaluationPoint["classification"], number> =
  {
    Positive: 1,
    Unsure: 0,
    Negative: -1,
  };

function ComparisonView({ options }: ComparisonViewProps) {
  const criteria = Array.from(
    new Set(
      options.flatMap((option) =>
        option.evaluationPoints.map((point) => point.text),
      ),
    ),
  );

  const getEvaluationPoint = (option: Option, criterion: string) => {
    return option.evaluationPoints.find((point) => point.text === criterion);
  };

  const getOptionScore = (option: Option) => {
    return option.evaluationPoints.reduce(
      (total, point) => total + classificationScores[point.classification],
      0,
    );
  };

  return (
    <div className="mt-10">
      <h4 className="mb-6 text-xl font-semibold text-gray-900">Comparison</h4>

      {options.length === 0 ? (
        <p className="text-gray-600">No options available for comparison.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full border-collapse bg-white">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-900">
                  Criterion
                </th>

                {options.map((option) => (
                  <th
                    key={option.id}
                    className="px-5 py-4 text-left text-sm font-semibold text-gray-900"
                  >
                    {option.name}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {criteria.map((criterion) => (
                <tr
                  key={criterion}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    {criterion}
                  </td>

                  {options.map((option) => {
                    const point = getEvaluationPoint(option, criterion);

                    return (
                      <td key={option.id} className="px-5 py-4 align-top">
                        {point ? (
                          <div className="space-y-1 text-sm">
                            <p className="font-medium text-gray-900">
                              {point.classification}
                            </p>

                            <p className="text-gray-600">
                              Importance: {point.importance}
                            </p>

                            <p className="text-gray-600">
                              Confidence: {point.confidence}
                            </p>
                          </div>
                        ) : (
                          <span className="text-gray-400">Not evaluated</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr className="border-t border-gray-300 bg-gray-50">
                <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                  Score
                </td>

                {options.map((option) => (
                  <td
                    key={option.id}
                    className="px-5 py-4 text-sm font-semibold text-gray-900"
                  >
                    {getOptionScore(option)}
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}

export default ComparisonView;
