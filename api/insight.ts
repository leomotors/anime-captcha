import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAll } from "../data/data";

const scoreFormula = (correct: number) =>
  200 + 10 * Math.round((correct / 16) * 60);

export default (req: VercelRequest, res: VercelResponse) => {
  const data = getAll();

  const response = {
    categories: {},
    score_scale: {},
    created_at: new Date().toISOString(),
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

  for (let i = 0; i <= 16; i++) {
    response.score_scale[i] = scoreFormula(i);
  }

  res.status(200).json(response);
};
