import fs from "fs";
import path from "path";

export default (dir: string, isDemo = false) =>
  fs
    .readFileSync(
      path.join(dir, "input", `${isDemo ? "demo" : "input"}.txt`),
      "utf-8"
    )
    .split("\r\n");
