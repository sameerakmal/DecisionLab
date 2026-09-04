export type DecisionStatus = | "Researching" | "Ready to Decide" | "Decided";

export type Classification =
  | "Positive"
  | "Unsure"
  | "Negative";

export type Importance =
  | "Low"
  | "Medium"
  | "High";

export type Confidence =
  | "Low"
  | "Medium"
  | "High";

export interface EvaluationPoint {
  id: string;
  text: string;
  classification: Classification;
  importance: Importance;
  confidence: Confidence;
  order: number;
}

export interface Option {
  id: string;
  name: string;
  description: string;
  price?: number;
  referenceUrl?: string;
  evaluationPoints: EvaluationPoint[];
}

export interface Conclusion {
  selectedOptionId: string;
  reasoning: string;
  remainingConcerns: string;
  decisionDate: string;
}

export interface Decision {
  id: string;
  title: string;
  context?: string;
  category?: string;
  budget?: number;
  status: DecisionStatus;
  createdAt: string;
  updatedAt: string;
  options: Option[];
  conclusion?: Conclusion;
}   