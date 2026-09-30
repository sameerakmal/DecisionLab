import { useState } from "react";
import type { EvaluationPoint } from "../types/decision";

type EvaluationBoardProps = {
  evaluationPoints: EvaluationPoint[];
  onChange: (evaluationPoints: EvaluationPoint[]) => void;
};

function EvaluationBoard({
  evaluationPoints: initialEvaluationPoints,
  onChange,
}: EvaluationBoardProps) {
  const [evaluationPoints, setEvaluationPoints] = useState(
    initialEvaluationPoints,
  );

  const [draggedPointId, setDraggedPointId] = useState<string | null>(null);

  const classifications: EvaluationPoint["classification"][] = [
    "Positive",
    "Unsure",
    "Negative",
  ];

  const handleDragStart = (pointId: string) => {
    setDraggedPointId(pointId);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (classification: EvaluationPoint["classification"]) => {
    if (!draggedPointId) {
      return;
    }

    const draggedPoint = evaluationPoints.find(
      (point) => point.id === draggedPointId,
    );

    if (!draggedPoint) {
      return;
    }

    const pointsInColumn = evaluationPoints
      .filter((point) => point.classification === classification)
      .sort((a, b) => a.order - b.order);

    const newOrder = pointsInColumn.length;

    const updatedPoints = evaluationPoints.map((point) =>
      point.id === draggedPointId
        ? {
            ...point,
            classification,
            order: newOrder,
          }
        : point,
    );

    setEvaluationPoints(updatedPoints);
    onChange(updatedPoints);
    setDraggedPointId(null);
  };

  return (
    <div className="mt-6">
      <h6 className="mb-4 text-lg font-semibold text-gray-900">
        Evaluation Board
      </h6>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {classifications.map((classification) => {
          const points = evaluationPoints
            .filter((point) => point.classification === classification)
            .sort((a, b) => a.order - b.order);

          return (
            <div
              key={classification}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(classification)}
              className="min-h-40 rounded-xl border border-gray-200 bg-gray-50 p-4"
            >
              <h5 className="mb-4 text-base font-semibold text-gray-900">
                {classification}
              </h5>

              <div className="space-y-3">
                {points.length === 0 ? (
                  <p className="text-sm text-gray-500">No evaluation points.</p>
                ) : (
                  points.map((point) => (
                    <div
                      key={point.id}
                      draggable={true}
                      onDragStart={() => handleDragStart(point.id)}
                      className="cursor-grab rounded-lg border border-gray-200 bg-white p-4 shadow-sm active:cursor-grabbing"
                    >
                      <p className="font-medium text-gray-900">{point.text}</p>

                      <p className="mt-2 text-sm text-gray-600">
                        Importance: {point.importance}
                      </p>

                      <p className="text-sm text-gray-600">
                        Confidence: {point.confidence}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EvaluationBoard;
