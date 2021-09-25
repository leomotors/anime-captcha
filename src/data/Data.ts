import type { CaptchaType } from "../models/CaptchaType";

import * as loli from "./loli.json";

export const Data: CaptchaType[] = [loli];

export function prepareData(Data: CaptchaType[]): CaptchaType {
  const data = Data[Math.floor(Math.random() * Data.length)];
  const questions = data.questions.sort(() => 0.5 - Math.random()).slice(0, 16);

  // * Some error occured and I need to do this
  return {
    title: data.title,
    questions: questions,
    onFail: data.onFail,
  };
}
