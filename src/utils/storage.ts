import type { Decision } from "../types/decision";

const STORAGE_KEY = "decisions";

export function saveDecision(decision: Decision): Decision[] {
  const storedDecisions = localStorage.getItem(STORAGE_KEY);

  const decisions: Decision[] = storedDecisions
    ? JSON.parse(storedDecisions)
    : [];

  decisions.push(decision);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));

  return decisions;
}

export function getDecisions() : Decision[]{
    const storedDecisions = localStorage.getItem(STORAGE_KEY);

    if(!storedDecisions){
        return [];
    }

    return JSON.parse(storedDecisions);
}