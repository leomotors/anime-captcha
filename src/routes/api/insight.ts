import type { RequestHandler } from "@sveltejs/kit";

import Insight from "$data/insight.g.json";

export const GET: RequestHandler = () => {
  return {
    status: 200,
    body: Insight,
  };
};
