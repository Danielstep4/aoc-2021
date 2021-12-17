import readFile from "../../reader";
import Bingo from "./bingo";

const DEMO_INPUT = readFile(__dirname, true);
const INPUT = readFile(__dirname);

const solution = new Bingo(INPUT).play(false);
// const demoSolution = new Bingo(DEMO_INPUT).play(false);

console.log(solution, "demoSolution");
