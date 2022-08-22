import type { RequestHandler } from "@sveltejs/kit";
import type { JSONObject } from "@sveltejs/kit/types/private";

import { getQuestions, getRandomQuestions } from "$data/getter";

export const GET: RequestHandler = ({ params }) => {
  const category = params.category;

  if (category) {
    const questions = getQuestions(category);

    if (questions) {
      throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
      // Suggestion (check for correctness before using):
      // return new Response(questions as unknown as JSONObject);
      return {
        status: 200,
        body: questions as unknown as JSONObject,
      };
    } else {
      return new Response("Invalid Category", { status: 400 });
    }
  } else {
    const questions = getRandomQuestions();

    if (questions) {
      throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
      // Suggestion (check for correctness before using):
      // return new Response(questions as unknown as JSONObject);
      return {
        status: 200,
        body: questions as unknown as JSONObject,
      };
    } else {
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};
