const fs = require("fs");
const file = "app/sfp2026/cv-builder/src/app/components/Screen4Finish.tsx";
let content = fs.readFileSync(file, "utf8");

const smallCopyRegex =
  /\{\/\* Copy button \*\/\}[\s\S]*?<\/button>\n\s*<\/div>/;

if (smallCopyRegex.test(content)) {
  content = content.replace(smallCopyRegex, `</div>`);
  fs.writeFileSync(file, content);
  console.log("Removed small copy button");
} else {
  console.log("Small copy button not found");
}
