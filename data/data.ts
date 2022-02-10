import { CaptchaType, CaptchaTypeJSON } from "../src/models/CaptchaType";

// * Import all JSON Files Here
import * as loli from "./loli.json";
import * as trap from "./trap.json";

const Data: { [category: string]: CaptchaTypeJSON } = { loli, trap };

// * loli and trap has equal weight (hani is removed)
export const weights = [0, 1, 2];

export function getQuestions(category: string): CaptchaType | undefined {
  const data = Data[category];

  if (!data) return undefined;

  const questions = data.questions.sort(() => 0.5 - Math.random()).slice(0, 16);

  return {
    category,
    title: data.title,
    questions: questions,
    onFail: data.onFail,
  };
}

function getCategoryByIndex(index: number): number {
  for (let i = 0; i < weights.length; i++) {
    if (weights[i] > index) return i - 1;
  }
}

export function getRandomQuestions(): CaptchaType | undefined {
  const category_index = Math.random() * weights[weights.length - 1];
  const category = Object.keys(Data)[getCategoryByIndex(category_index)];

  return getQuestions(category);
}

export function getAll() {
  return Data;
}
