import type { CaptchaType } from "$data/model";

import { Data } from "./data.g";
const data_length = Object.keys(Data).length;

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

export function getRandomQuestions(): CaptchaType | undefined {
  const category = Object.keys(Data)[Math.floor(Math.random() * data_length)];

  return getQuestions(category);
}

export function getAll() {
  return Data;
}
