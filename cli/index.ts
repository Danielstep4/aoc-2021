import readline from "readline";
import createDayFoldar from "./createDayFolder";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(() => {
  const start = Date.now();

  rl.question("What day is it ? ", (day) => {
    createDayFoldar(day);
    rl.close();
  });

  rl.on("close", () => {
    const end = Date.now();
    console.log("Everything is done, GL HF! ", `${end - start}ms`);
    process.exit(0);
  });
})();
