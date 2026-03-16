const fs = require("fs");
const file = "app/sfp2026/cv-builder/src/app/components/Screen3Workspace.tsx";
let content = fs.readFileSync(file, "utf8");

// add posthog import
if (!content.includes("import posthog from 'posthog-js'")) {
  content = content.replace(
    'import { motion, AnimatePresence } from "motion/react";',
    "import { motion, AnimatePresence } from 'motion/react';\nimport posthog from 'posthog-js'; // [ANALYTICS]",
  );
}

const handleChecksRegex =
  /const handleChecksChange = \(newChecks: \[boolean, boolean, boolean\]\) => \{[\s\S]*?setChecks\(newChecks\);\s+\};/;

const newHandleChecks = `const handleChecksChange = (newChecks: [boolean, boolean, boolean]) => {
    for (let i = 0; i < 3; i++) {
      if (newChecks[i] && !checks[i]) {
        if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        setMicroToast({ key: Date.now(), step: i });
        toastTimerRef.current = setTimeout(() => setMicroToast(null), 2600);
        
        posthog.capture('cv_builder_checkbox_ticked', { section: activeSection, item_index: i }); // [ANALYTICS]
        break;
      }
    }
    
    const wasAllChecked = checks.filter(Boolean).length === 3;
    const isAllChecked = newChecks.filter(Boolean).length === 3;
    if (!wasAllChecked && isAllChecked) {
       posthog.capture('cv_builder_ai_prompt_unlocked', { section: activeSection }); // [ANALYTICS]
    }
    
    setChecks(newChecks);
  };`;

if (handleChecksRegex.test(content)) {
  content = content.replace(handleChecksRegex, newHandleChecks);
  fs.writeFileSync(file, content);
  console.log("Screen3 replaced");
} else {
  console.log("handleChecksChange not found");
}
