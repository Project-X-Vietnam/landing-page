const fs = require("fs");
const file = "app/sfp2026/cv-builder/src/app/components/Screen1Pillars.tsx";
let content = fs.readFileSync(file, "utf8");

// add posthog import
if (!content.includes("import posthog from 'posthog-js'")) {
  content = content.replace(
    'import { motion } from "motion/react";',
    "import { motion } from 'motion/react';\nimport posthog from 'posthog-js'; // [ANALYTICS]",
  );
}

const onNextStr = `          <motion.button
            whileHover={{ scale: canProceed ? 1.02 : 1 }}
            whileTap={{ scale: canProceed ? 0.98 : 1 }}
            onClick={onNext}`;

const newOnNextStr = `          <motion.button
            whileHover={{ scale: canProceed ? 1.02 : 1 }}
            whileTap={{ scale: canProceed ? 0.98 : 1 }}
            onClick={() => {
              if (selectedRole) {
                posthog.capture('cv_builder_role_selected', { role: selectedRole }); // [ANALYTICS]
              }
              onNext();
            }}`;

content = content.replace(onNextStr, newOnNextStr);
fs.writeFileSync(file, content);
console.log("Screen1 injected");
