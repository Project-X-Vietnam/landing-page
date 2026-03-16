const fs = require("fs");
const file = "app/sfp2026/cv-builder/src/app/components/Screen4Finish.tsx";
let content = fs.readFileSync(file, "utf8");

// add posthog import
if (!content.includes("import posthog from 'posthog-js'")) {
  content = content.replace(
    'import { motion } from "motion/react";',
    "import { motion } from 'motion/react';\nimport posthog from 'posthog-js'; // [ANALYTICS]",
  );
}

const handleCopyRegex =
  /const handleCopy = \(\) => \{\s+navigator\.clipboard\.writeText\(bullet\)\.then\(\(\) => \{\s+setCopied\(true\);\s+setTimeout\(\(\) => setCopied\(false\), 2000\);\s+\}\);\s+\};/;

const newHandleCopy = `const handleCopy = () => {
    navigator.clipboard.writeText(bullet).then(() => {
      setCopied(true);
      posthog.capture('cv_builder_prompt_copied'); // [ANALYTICS]
      setTimeout(() => setCopied(false), 2000);
    });
  };`;

const downloadRegex =
  /onClick=\{\(\) => \{\s+window\.open\("https:\/\/projectx\.vn", "_blank"\);\s+\}\}/;
const newDownload = `onClick={() => {
                 posthog.capture('cv_builder_template_downloaded'); // [ANALYTICS]
                 window.open("https://projectx.vn", "_blank");
              }}`;

if (handleCopyRegex.test(content)) {
  content = content.replace(handleCopyRegex, newHandleCopy);
} else {
  console.log("handleCopy not found");
}

if (downloadRegex.test(content)) {
  content = content.replace(downloadRegex, newDownload);
} else {
  console.log("Download not found");
}

fs.writeFileSync(file, content);
console.log("Screen4 replaced");
