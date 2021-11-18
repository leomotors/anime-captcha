import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAll } from "../data/data";

export default (req: VercelRequest, res: VercelResponse) => {
  res.status(200).json(getAll());
};
