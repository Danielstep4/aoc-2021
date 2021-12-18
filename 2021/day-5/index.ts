import fileReader from "../../reader";
import HydrothermalVenture from "./hydrothermal-venture";

const DEMO_INPUT = fileReader(__dirname, true);
const INPUT = fileReader(__dirname);

const SOLUTION = new HydrothermalVenture(INPUT, true).findOverlap();

console.log(SOLUTION);
