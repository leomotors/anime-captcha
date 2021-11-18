import { VercelRequest, VercelResponse } from "@vercel/node";
import { getRandomQuestions } from "../data/data";

export default (req: VercelRequest, res: VercelResponse): void => {
  const questions = getRandomQuestions();

  if (questions) {
    res.status(200).json(questions);
  } else {
    res.status(500).send("Internal Server Error");
  }
};
