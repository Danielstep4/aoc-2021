import readline from "readline";
import createDayFoldar from "./createDayFolder";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(() => {
  let start: number;
  rl.question("What day is it ? ", (day) => {
    start = Date.now();
    createDayFoldar(day);
    rl.close();
  });

  rl.on("close", () => {
    const end = Date.now();
    console.log("Everything is done, GL HF! ", `${end - start}ms`);
    process.exit(0);
  });
})();
