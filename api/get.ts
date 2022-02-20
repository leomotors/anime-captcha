import { VercelRequest, VercelResponse } from "@vercel/node";
import { getQuestions, getRandomQuestions } from "../data/data";

export default (req: VercelRequest, res: VercelResponse) => {
  let category = req.query.category;
  if (typeof category == "object") category = category[0];

  let filter = req.query.filter;
  if (typeof filter == "string") filter = [filter];

  let ignoreSize: string | string[] | boolean = req.query.ignoreSize;
  if (typeof ignoreSize == "object") ignoreSize = ignoreSize[0];
  ignoreSize = ignoreSize?.toLowerCase().includes("true") || +ignoreSize > 0;

  if (category) {
    const questions = getQuestions(category, filter, ignoreSize);

    if (typeof questions == "string") {
      res.status(400).send(questions);
    } else if (questions) {
      res.status(200).json(questions);
    } else {
      res.status(400).send("Invalid Category");
    }
  } else {
    const questions = getRandomQuestions(filter, ignoreSize);

    if (questions) {
      res.status(200).json(questions);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
};
