import { json } from "@sveltejs/kit";

import { getAll } from "$data/getter";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = () => {
  return json(getAll());
};
