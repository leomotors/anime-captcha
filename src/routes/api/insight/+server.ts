import { json } from "@sveltejs/kit";

import Insight from "$data/insight.g.json";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
  return json(Insight);
};
