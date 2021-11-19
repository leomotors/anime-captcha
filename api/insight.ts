import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAll } from "../data/data";
import { BuildTime, Version } from "../src/config";

export default (req: VercelRequest, res: VercelResponse) => {
  const data = getAll();

  const response = {
    categories: {},
    meta: {
      build_time: BuildTime,
      version: Version,
    },
  };

  for (const cat in data) {
    const catData = data[cat];

    let correct_count = 0;
    catData.questions.forEach((question) => {
      if (question.answer) correct_count++;
    });

    response.categories[cat] = {
      questions_count: catData.questions.length,
      correct_count,
      correct_ratio:
        Math.round((correct_count / catData.questions.length) * 1000) / 1000,
    };
  }

  res.status(200).json(response);
};
