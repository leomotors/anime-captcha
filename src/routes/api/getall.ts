import type { RequestHandler } from "@sveltejs/kit";
import type { JSONObject } from "@sveltejs/kit/types/private";

import { getAll } from "$data/getter";

export const get: RequestHandler = () => ({
  status: 200,
  body: getAll() as unknown as JSONObject,
});
