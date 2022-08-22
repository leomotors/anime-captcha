import { json as json$1 } from '@sveltejs/kit';
import type { RequestHandler } from "@sveltejs/kit";

import Insight from "$data/insight.g.json";

export const GET: RequestHandler = () => {
  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
  // Suggestion (check for correctness before using):
  // return json$1(Insight);
  return {
    status: 200,
    body: Insight,
  };
};
