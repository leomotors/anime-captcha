// @ts-check

import fs from "node:fs/promises";

const files = (await fs.readdir("./src/data")).filter(
  (fname) => fname.endsWith(".json") && !fname.includes(".g.")
);

const categories = [];

const insight = {
  categories: {},
  created_at: new Date().toISOString(),
};

for (const file of files) {
  /** @type {import("./src/data/model").CaptchaTypeJSON} */
  const data = JSON.parse((await fs.readFile(`./src/data/${file}`)).toString());

  const category = file.replace(".json", "");

  categories.push(category);

  let correct_count = 0;
  data.questions.forEach((question) => {
    if (question.answer) correct_count++;
  });

  insight.categories[category] = {
    questions_count: data.questions.length,
    correct_count,
    correct_ratio:
      Math.round((correct_count / data.questions.length) * 1000) / 1000,
  };
}

fs.writeFile(
  "./src/data/data.g.ts",
  `
import type { CaptchaTypeJSON } from "$data/model";

${categories.reduce(
  (prev, cate) => prev + `import * as ${cate} from "./${cate}.json";\n`,
  ""
)}

export const Data: { [category: string]: CaptchaTypeJSON } = { ${categories} };
`
);

fs.writeFile("./src/data/insight.g.json", JSON.stringify(insight));
