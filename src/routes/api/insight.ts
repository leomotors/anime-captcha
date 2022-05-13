import Insight from "$data/insight.g.json";

import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = () => {
  return {
    status: 200,
    body: Insight,
  };
};
