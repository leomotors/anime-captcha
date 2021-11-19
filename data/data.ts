import { CaptchaType } from "../src/models/CaptchaType";

// * Import all JSON Files Here
import * as loli from "./loli.json";
import * as trap from "./trap.json";
import * as hani from "./hani.json";

const Data: { [category: string]: CaptchaType } = { loli, trap, hani };

export function getQuestions(category: string): CaptchaType {
  const data = Data[category];

  if (!data) return undefined;

  const questions = data.questions.sort(() => 0.5 - Math.random()).slice(0, 16);

  return {
    title: data.title,
    questions: questions,
    onFail: data.onFail,
  };
}

export function getRandomQuestions(): CaptchaType {
  const category =
    Object.keys(Data)[Math.floor(Math.random() * Object.keys(Data).length)];

  return getQuestions(category);
}

export function getAll() {
  return Data;
}
