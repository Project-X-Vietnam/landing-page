const fs = require("fs");
const file = "app/sfp2026/cv-builder/src/app/components/Screen1Pillars.tsx";
let content = fs.readFileSync(file, "utf8");

const regex =
  /\{\/\* \/\/ \[UX FIX - Change 1\] \*\*\/\}[\s\S]*?STEP 1 OF 3[\s\S]*?<h1/;

const betterRegex =
  /\{\/\* \/\/ \[UX FIX - Change 1\] \*\/\}[\s\S]*?STEP 1 OF 3\r?\n\r?\n\s*<h1/g;

content = content.replace(
  betterRegex,
  `{/* // [UX FIX - Change 1] */}
            ● STEP 1 OF 3
          </span>
        </div>

        <h1`,
);

fs.writeFileSync(file, content);
console.log("Fixed syntax error Screen 1");
