import path from "path";
import fs from "fs";

const DAYS_DIR = path.join(
  __dirname,
  "..",
  new Date().getFullYear().toString()
);

export default (day: string) => {
  console.log(
    "Creating day ",
    day,
    " folder with everyhing you need to start."
  );

  const newDirPath = path.join(DAYS_DIR, `day-${day}`);

  const dayAlreadyExists = fs.existsSync(newDirPath);

  if (dayAlreadyExists) return;

  fs.mkdirSync(newDirPath);

  fs.writeFileSync(
    path.join(newDirPath, "index.ts"),
    `import fileReader from "../../reader";\n\nconst DEMO_INPUT = fileReader(__dirname, true);\nconst INPUT = fileReader(__dirname);\n\n\nconst SOLUTION = "";\n\n\n// console.log(SOLUTION);`,
    { encoding: "utf-8" }
  );

  const newInputPath = path.join(newDirPath, "input");
  const newSomeClass = path.join(newDirPath, "someClass");

  fs.mkdirSync(newInputPath);

  fs.writeFileSync(path.join(newInputPath, "input.txt"), "");
  fs.writeFileSync(path.join(newInputPath, "demo.txt"), "");

  fs.mkdirSync(newSomeClass);

  fs.writeFileSync(
    path.join(newSomeClass, "index.ts"),
    `class someClass {};\n\n\nexport default someClass;`
  );
};
