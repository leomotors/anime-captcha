import { error } from "@sveltejs/kit";

import { dev } from "$app/environment";
import type { CaptchaGetAll } from "$data/model";
import { PUBLIC_ENV } from "$env/static/public";
import type { Insight } from "$types";

import type { PageLoad } from "./$types";

export const prerender = false;

export const load: PageLoad = async ({ fetch }) => {
  if (!dev && PUBLIC_ENV === "production")
    throw error(403, "You shall not pass! Debug is only available in Debug");

  const [data, insight] = await Promise.all([
    fetch("/api/getall").then((r) => r.json()),
    fetch("/api/insight").then((r) => r.json()),
  ]);

  return {
    captchaData: data as CaptchaGetAll,
    insight: insight as Insight,
  };
};
