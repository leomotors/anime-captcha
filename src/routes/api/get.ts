import type { RequestHandler } from "@sveltejs/kit";
import type { JSONObject } from "@sveltejs/kit/types/private";

import { getQuestions, getRandomQuestions } from "$data/getter";

export const get: RequestHandler = ({ params }) => {
  const category = params.category;

  if (category) {
    const questions = getQuestions(category);

    if (questions) {
      return {
        status: 200,
        body: questions as unknown as JSONObject,
      };
    } else {
      return {
        status: 400,
        body: "Invalid Category",
      };
    }
  } else {
    const questions = getRandomQuestions();

    if (questions) {
      return {
        status: 200,
        body: questions as unknown as JSONObject,
      };
    } else {
      return {
        status: 500,
        body: "Internal Server Error",
      };
    }
  }
};
