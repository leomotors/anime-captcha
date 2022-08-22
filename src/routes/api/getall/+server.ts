import type { RequestHandler } from "@sveltejs/kit";
import type { JSONObject } from "@sveltejs/kit/types/private";

import { getAll } from "$data/getter";

throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
// Suggestion (check for correctness before using):
// // return new Response(getAll() as unknown as JSONObject);
export const GET: RequestHandler = () => ({
  status: 200,
  body: getAll() as unknown as JSONObject,
});
