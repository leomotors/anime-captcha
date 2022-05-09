import { VercelRequest, VercelResponse } from "@vercel/node";
import { getQuestions, getRandomQuestions } from "../data/data";

export default (req: VercelRequest, res: VercelResponse) => {
  let category = req.query.category;
  if (typeof category == "object") category = category[0];

  if (category) {
    const questions = getQuestions(category);

    if (questions) {
      res.status(200).json(questions);
    } else {
      res.status(400).send("Invalid Category");
    }
  } else {
    const questions = getRandomQuestions();

    if (questions) {
      res.status(200).json(questions);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};
