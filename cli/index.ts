import readline from "readline";
import createDayFoldar from "./createDayFolder";
import { Lang } from "./types";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let start: number;

rl.question("What day is it ? ", (day) => {
  if (isNaN(Number(day))) throw new Error("Please insert correct day number!");

  start = Date.now();
  rl.question("What year is it?", (year) => {
    rl.question("What language would you use? (py, js, ts)", (lang) => {
      const $lang = lang as Lang;
      createDayFoldar(day, year, $lang);
      rl.close();
    });
  });
});

rl.on("close", () => {
  const end = Date.now();
  console.log("Everything is done, GL HF! ", `${end - start}ms`);
  process.exit(0);
});
