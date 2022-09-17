import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  if (event.url.pathname.startsWith("/api")) {
    response.headers.set("Access-Control-Allow-Origin", "*");
  }

  return response;
};
