export function trimHTML(str: string): string {
  let res = "";

  let open = 0;
  let close = 0;
  for (const c of str) {
    if (c == "<") open++;
    else if (c == ">") {
      close++;
      if (res[res.length - 1] != " ") res += " ";
    } else if (open <= close && (c != " " || res[res.length - 1] != " "))
      res += c;
  }

  if (res[res.length - 1] == " ") res = res.slice(0, -1);

  return res;
}
