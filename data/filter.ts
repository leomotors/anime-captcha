import { Question } from "../src/models/CaptchaType";

interface FilterOptions {
  byanime: string[];
  byname: string[];
}

function t(str: string) {
  return str.replace(/[\s_]+/g, "").toLowerCase();
}

export function parseFilter(opts: string[] | undefined): FilterOptions {
  const fopt = {
    byanime: [],
    byname: [],
  };

  if (!opts) return fopt;

  for (const opt of opts) {
    const [key, args] = opt.split(":");
    if (!(key in fopt && args.length > 0)) continue;

    for (const arg of args.split(",")) {
      fopt[key].push(t(arg));
    }
  }

  return fopt;
}

enum TestResult {
  PASS,
  NOT_PASS,
  FAIL,
}

function testQuestion(str: string, test: string): TestResult {
  if (test.startsWith("!")) {
    return str.includes(test.slice(1)) ? TestResult.FAIL : TestResult.NOT_PASS;
  }

  return str.includes(test) ? TestResult.PASS : TestResult.NOT_PASS;
}

export function filterQuestions(
  data: Question[],
  opt: FilterOptions
): Question[] {
  if (opt.byanime.length == 0 && opt.byname.length == 0) return data;

  const res: Question[] = [];

  for (const q of data) {
    let pass = false;
    let failed = false;
    for (const fil of opt.byanime) {
      const res = testQuestion(t(q.anime.en), t(fil));

      if (res == TestResult.PASS) pass = true;
      else if (res == TestResult.FAIL) failed = true;

      if (failed) break;
    }

    if (!failed)
      for (const fil of opt.byname) {
        const res = testQuestion(t(q.name.en), t(fil));

        if (res == TestResult.PASS) pass = true;
        else if (res == TestResult.FAIL) failed = true;

        if (failed) break;
      }

    pass &&= !failed;

    if (pass) res.push(q);
  }

  return res;
}
