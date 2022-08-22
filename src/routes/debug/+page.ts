import { error } from '@sveltejs/kit';
import type { PageLoad } from "@sveltejs/kit";

import { dev } from "$app/env";
import type { CaptchaGetAll } from "$data/model";
import type { Insight } from "$types";

export const prerender = false;

export const load: PageLoad = async ({ fetch }) => {
  if (!dev)
    throw error(403, "You shall not pass! Debug is only available in Debug");

  const [_data, _insight] = await Promise.all([
    fetch("/api/getall"),
    fetch("/api/insight"),
  ]);

  const [data, insight] = await Promise.all([_data.json(), _insight.json()]);

  return {
  data: data as CaptchaGetAll,
  insight: insight as Insight,
};
};
