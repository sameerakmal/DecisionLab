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
  const [editingPointId, setEditingPointId] = useState<string | null>(null);

  const [editText, setEditText] = useState("");
  const [editImportance, setEditImportance] =
    useState<EvaluationPoint["importance"]>("Medium");
  const [editConfidence, setEditConfidence] =
    useState<EvaluationPoint["confidence"]>("Medium");

  const [draggedPointId, setDraggedPointId] = useState<string | null>(null);

  const classifications: EvaluationPoint["classification"][] = [
    "Positive",
    "Unsure",
    "Negative",
  ];

  const handleEdit = (point: EvaluationPoint) => {
    setEditingPointId(point.id);
    setEditText(point.text);
    setEditImportance(point.importance);
    setEditConfidence(point.confidence);
  };

  const handleSave = () => {
    if (!editingPointId) {
      return;
    }

    const updatedPoints = evaluationPoints.map((point) =>
      point.id === editingPointId
        ? {
            ...point,
            text: editText,
            importance: editImportance,
            confidence: editConfidence,
          }
        : point,
    );

    setEvaluationPoints(updatedPoints);
    onChange(updatedPoints);

    setEditingPointId(null);
  };

  const handleCancel = () => {
    setEditingPointId(null);
  };

  const handleDelete = (pointId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this evaluation point?",
    );

    if (!confirmed) {
      return;
    }

    const remainingPoints = evaluationPoints.filter(
      (point) => point.id !== pointId,
    );

    const updatedPoints = remainingPoints.map((point) => {
      const pointsInSameColumn = remainingPoints
        .filter(
          (currentPoint) =>
            currentPoint.classification === point.classification,
        )
        .sort((a, b) => a.order - b.order);

      const newOrder = pointsInSameColumn.findIndex(
        (currentPoint) => currentPoint.id === point.id,
      );

      return {
        ...point,
        order: newOrder,
      };
    });

    setEvaluationPoints(updatedPoints);
    onChange(updatedPoints);
  };

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
                      draggable={editingPointId !== point.id}
                      onDragStart={() => handleDragStart(point.id)}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      {editingPointId === point.id ? (
                        <div className="space-y-4">
                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-900">
                              Text
                            </label>

                            <input
                              type="text"
                              value={editText}
                              onChange={(event) =>
                                setEditText(event.target.value)
                              }
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-900">
                              Importance
                            </label>

                            <select
                              value={editImportance}
                              onChange={(event) =>
                                setEditImportance(
                                  event.target
                                    .value as EvaluationPoint["importance"],
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-gray-900">
                              Confidence
                            </label>

                            <select
                              value={editConfidence}
                              onChange={(event) =>
                                setEditConfidence(
                                  event.target
                                    .value as EvaluationPoint["confidence"],
                                )
                              }
                              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                          </div>

                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={handleSave}
                              className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
                            >
                              Save
                            </button>

                            <button
                              type="button"
                              onClick={handleCancel}
                              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium text-gray-900">
                            {point.text}
                          </p>

                          <p className="mt-2 text-sm text-gray-600">
                            Importance: {point.importance}
                          </p>

                          <p className="text-sm text-gray-600">
                            Confidence: {point.confidence}
                          </p>

                          <div className="mt-3 flex gap-4">
                            <button
                              type="button"
                              onClick={() => handleEdit(point)}
                              className="text-sm font-medium text-blue-600 hover:text-blue-800"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(point.id)}
                              className="text-sm font-medium text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
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
