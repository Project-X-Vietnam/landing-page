const fs = require("fs");
const file = "app/sfp2026/cv-builder/src/app/components/Screen4Finish.tsx";
let content = fs.readFileSync(file, "utf8");

// Change 1
content = content.replace(
  "COPY PROMPT TO CHATGPT",
  "Copy Your AI Rewrite Prompt",
);

const subtextBlock = `</motion.button>
              {/* [UX FIX - Change 1] Subtext */}
              <div style={{ fontSize: 12, color: "#6B7280", textAlign: "center", marginTop: 4 }}>
                Paste into any AI tool to instantly tailor and strengthen your CV bullets
              </div>`;

content = content.replace(/<\/motion\.button>/, subtextBlock);

// Change 2: Remove "Apply for SFP Round 2" ghost button
const removeRegex =
  /\{\/\*\s*Ghost button - Secondary\s*\*\/\}[\s\S]*?Apply for SFP Round 2[\s\S]*?<\/button>\s*/;
content = content.replace(removeRegex, "");

fs.writeFileSync(file, content);
console.log("Fixed Screen4Finish");
