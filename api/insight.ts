import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAll, weights } from "../data/data";
import { Insight } from "../src/models/Insight";

export default (req: VercelRequest, res: VercelResponse) => {
  const data = getAll();

  const response: Insight = {
    categories: {},
    created_at: new Date().toISOString(),
  };

  const dataKey = Object.keys(data);
  for (let i = 0; i < dataKey.length; i++) {
    const cat = dataKey[i];

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
      weight: weights[i + 1] - weights[i],
    };
  }

  res.status(200).json(response);
};
