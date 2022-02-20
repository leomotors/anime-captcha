import { CaptchaType, CaptchaTypeJSON } from "../src/models/CaptchaType";
import { filterQuestions, parseFilter } from "./filter";

// * Import all JSON Files Here
import * as loli from "./loli.json";
import * as trap from "./trap.json";

const Data: { [category: string]: CaptchaTypeJSON } = { loli, trap };

// * loli and trap has equal weight (hani is removed)
export const weights = [0, 1, 2];

export function getQuestions(
  category: string,
  filterOption: string[] = [],
  ignoreSize = false
): CaptchaType | string {
  const data = Data[category];

  if (!data) return "Invalid Category!";

  const filteredQuestion = filterQuestions(
    data.questions,
    parseFilter(filterOption)
  );

  if (filteredQuestion.length < 16 && !ignoreSize)
    return "Your filter is too strict, the amount of question after filter must be atleast 16!";

  const questions = filteredQuestion
    .sort(() => 0.5 - Math.random())
    .slice(0, 16);

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

export function getRandomQuestions(
  filterOption: string[] = [],
  ignoreSize = false
): CaptchaType | undefined {
  const category_index = Math.random() * weights[weights.length - 1];
  const category = Object.keys(Data)[getCategoryByIndex(category_index)];

  const res = getQuestions(category, filterOption, ignoreSize);
  if (typeof res == "string") return undefined;
  return res;
}

export function getAll() {
  return Data;
}
