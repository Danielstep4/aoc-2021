import path from "path";
import fs from "fs";
import type { Lang } from "./types";

const DAYS_DIR = path.join(__dirname, "..");

export default (day: string, year: string = "2021", lang: Lang = "ts") => {
  console.log(
    "Creating day ",
    day,
    " folder with everyhing you need to start."
  );

  const newDirPath = path.join(DAYS_DIR, year, `day-${day}`);

  const dayAlreadyExists = fs.existsSync(newDirPath);

  if (dayAlreadyExists) return;

  fs.mkdirSync(newDirPath);

  const innerText = fs.readFileSync(
    path.join(__dirname, "templates", lang, `index.${lang}`),
    "utf-8"
  );

  fs.appendFileSync(path.join(newDirPath, `index.${lang}`), innerText, {
    encoding: "utf-8",
  });

  const newInputPath = path.join(newDirPath, "input");

  fs.mkdirSync(newInputPath);

  fs.writeFileSync(path.join(newInputPath, "input.txt"), "");
  fs.writeFileSync(path.join(newInputPath, "demo.txt"), "");
};
