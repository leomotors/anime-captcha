import type { CaptchaType, Question } from "$data/model";

export interface PlayResult {
  dataset: CaptchaType;
  user_answer: boolean[][];
  score: number;
  submission_time: string;
  time_used: number;
}

const saveVersion = "2";

const keys = {
  saveVersion: "saveVersion",
  history: "history",
} as const;

let cachedResults: PlayResult[];

export function resetStorage() {
  localStorage.clear();
  localStorage.setItem(keys.saveVersion, saveVersion);
}

export function pushResult(result: PlayResult) {
  if (localStorage.getItem(keys.saveVersion) != saveVersion) {
    // * No migrations implemented yet
    resetStorage();
  }

  const history = getAllResults();

  history.push(result);

  if (history.length > 100) {
    history.shift();
  }

  localStorage.setItem(keys.history, JSON.stringify(history));

  cachedResults = history;
}

export function getResultsByID(index: number) {
  const res = getAllResults();

  if (index < 0) index += res.length;

  return res[index];
}

export function getAllResults() {
  if (!cachedResults) {
    cachedResults = JSON.parse(
      localStorage.getItem(keys.history) || "[]"
    ) as PlayResult[];
  }

  return cachedResults;
}

export function computeScore(questions: Question[], key: boolean[][]) {
  let correct = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (questions[4 * i + j].answer == key[i][j]) {
        correct += 1;
      }
    }
  }

  return correct;
}
