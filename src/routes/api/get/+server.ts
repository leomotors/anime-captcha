import { error, json } from "@sveltejs/kit";

import { getQuestions, getRandomQuestions } from "$data/getter";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ params }) => {
  const category = params.category;

  if (category) {
    const questions = getQuestions(category);

    if (questions) {
      return json(questions);
    } else {
      return error(400, "Invalid Category");
    }
  } else {
    const questions = getRandomQuestions();

    if (questions) {
      return json(questions);
    } else {
      return error(500, "Internal Server Error");
    }
  }
};
