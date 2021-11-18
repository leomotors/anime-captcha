import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAll } from "../data/data";

export default (req: VercelRequest, res: VercelResponse) => {
  const data = getAll();

  const response = {
    categories: {},
  };

  for (const cat in data) {
    const catData = data[cat];

    response.categories[cat] = {
      questions_count: catData.questions.length,
    };
  }

  res.status(200).json(response);
};
