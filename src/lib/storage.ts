import type { CaptchaType } from "$data/model";

export interface PlayResult {
  dataset: CaptchaType;
  user_answer: boolean[][];
  submission_time: string;
  time_used: number;
}

const saveVersion = "1";

const keys = {
  saveVersion: "saveVersion",
  history: "history",
} as const;

let cachedResults: PlayResult[];

export function pushResult(result: PlayResult) {
  if (localStorage.getItem(keys.saveVersion) != saveVersion) {
    // * No migrations implemented yet
    localStorage.clear();
    localStorage.setItem(keys.saveVersion, saveVersion);
  }

  const history = getAllResults();

  history.push(result);

  if (history.length > 100) {
    history.shift();
  }

  localStorage.setItem(keys.history, JSON.stringify(history));

  cachedResults = history;
}

export function getResultsByID(index = -1) {
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

export function computeScore(res: PlayResult) {
  let correct = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (res.dataset.questions[4 * i + j].answer == res.user_answer[i][j]) {
        correct += 1;
      }
    }
  }

  return correct;
}
