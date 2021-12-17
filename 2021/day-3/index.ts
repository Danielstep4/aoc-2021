import readInput from "../../reader";
import Submarine from "./Submarine";

const INPUT = readInput(__dirname);
const DEMO_INPUT = readInput(__dirname, true);

const DEMO_SUBMARINE = new Submarine(DEMO_INPUT);

const solution = new Submarine(INPUT).lifeSupportRating;
console.log(solution);
