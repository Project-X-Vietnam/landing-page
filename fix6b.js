const fs = require("fs");
const file = "app/sfp2026/cv-builder/src/app/components/Screen3Workspace.tsx";
let content = fs.readFileSync(file, "utf8");

if (!content.includes("import posthog from 'posthog-js'")) {
  content = content.replace(
    'import { motion, AnimatePresence } from "motion/react";',
    "import { motion, AnimatePresence } from \"motion/react\";\nimport posthog from 'posthog-js'; // [ANALYTICS]",
  );
}

// Checkbox ticked -> inside handleCheck (wait, let's look for `<button` inside `Checkboxes`)
const checkboxRegex =
  /<button\s+key=\{i\}\s+onClick=\{\(\) => \{\s+const newC = \[\.\.\.checks\] as \[boolean, boolean, boolean\];\s+newC\[i\] = !newC\[i\];\s+onChecksChange\(newC\);\s+\}\}/;
const newCheckboxStr = `<button
                        key={i}
                        onClick={() => {
                          const newC = [...checks] as [boolean, boolean, boolean];
                          newC[i] = !newC[i];
                          if (newC[i]) {
                            posthog.capture('cv_builder_checkbox_ticked', { section: panelKey, item_index: i }); // [ANALYTICS]
                          }
                          onChecksChange(newC);
                        }}`;

content = content.replace(checkboxRegex, newCheckboxStr);

// AI prompt unlocked
// When stageIndex === 3, there's `Unlock Prompt ✨` button or simply `allChecked` -> "Unlock your AI Prompt ✨"  maybe?
// Wait, the prompt panel appears automatically when allChecked === true.
// Alternatively, "lúc Unlock AI prompt" happens when `allChecked` becomes true. We can put it in a `useEffect` inside `RightInsightPanel`, but wait, we can just put it when `newC.filter(Boolean).length === 3` inside the Checkbox onClick?
// Let's modify Checkbox onClick carefully.

const checkboxMoreAdvancedRegex =
  /<button\s+key=\{i\}\s+onClick=\{\(\) => \{\s+const newC = \[\.\.\.checks\] as \[boolean, boolean, boolean\];\s+newC\[i\] = !newC\[i\];\s+(?:if \(newC\[i\]\) \{\s+posthog\.capture\('cv_builder_checkbox_ticked', \{ section: panelKey, item_index: i \}\);\s+\}\s+)?onChecksChange\(newC\);\s+\}\}/;

const newCheckboxMoreAdvancedStr = `<button
                        key={i}
                        onClick={() => {
                          const newC = [...checks] as [boolean, boolean, boolean];
                          const wasAllChecked = checks.filter(Boolean).length === 3;
                          newC[i] = !newC[i];
                          if (newC[i]) {
                            posthog.capture('cv_builder_checkbox_ticked', { section: panelKey, item_index: i });
                          }
                          const isAllChecked = newC.filter(Boolean).length === 3;
                          if (!wasAllChecked && isAllChecked) {
                            posthog.capture('cv_builder_ai_prompt_unlocked', { section: panelKey });
                          }
                          onChecksChange(newC);
                        }}`;

content = content.replace(checkboxRegex, newCheckboxMoreAdvancedStr);

fs.writeFileSync(file, content);
console.log("Screen3 injected");
