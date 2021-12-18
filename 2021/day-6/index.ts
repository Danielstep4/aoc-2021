import fileReader from "../../reader";
import Lanternfish from "./lanternfishes";

const DEMO_INPUT = fileReader(__dirname, true);
const INPUT = fileReader(__dirname);

const SOLUTION_DEMO = new Lanternfish(DEMO_INPUT).goToFuture(80);
const SOLUTION = new Lanternfish(INPUT).goToFuture(80);

console.log(SOLUTION);
