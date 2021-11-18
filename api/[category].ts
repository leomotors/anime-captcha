import { VercelRequest, VercelResponse } from "@vercel/node";
import { getQuestions } from "../data/data";

export default (req: VercelRequest, res: VercelResponse): void => {
  const category = req.query.category as string;

  const questions = getQuestions(category);

  if (questions) {
    res.status(200).json(questions);
  } else {
    res.status(400).send("That category does not exist!");
  }
};
