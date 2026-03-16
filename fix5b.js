const fs = require("fs");
const file = "app/sfp2026/cv-builder/src/app/components/Screen4Finish.tsx";
let content = fs.readFileSync(file, "utf8");

const regex =
  /<h1[\s\S]*?Your CV is[\s\S]*?<br \/>[\s\S]*?<span .*?>recruiter-ready\.<\/span>[\s\S]*?<\/h1>\s*<p .*?>[\s\S]*?full application kit\.[\s\S]*?<\/p>/;

const newHeader = `            {/* [UX FIX - Change 5] Header & Copy */}
            <h1
              style={{
                fontSize: "clamp(30px, 5vw, 48px)",
                fontWeight: 800,
                color: "#020818",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                marginBottom: 14,
              }}
            >
              Your AI rewrite prompt is
              <br />
              <span style={{ color: "#0E56FA" }}>ready 🎯</span>
            </h1>

            <p style={{ fontSize: 16, color: "#475569", lineHeight: 1.6 }}>
              Copy the prompt below and paste into ChatGPT/Claude to rewrite your CV instantly.
            </p>`;

if (regex.test(content)) {
  content = content.replace(regex, newHeader);
  fs.writeFileSync(file, content);
  console.log("Replaced h1");
} else {
  console.log("h1 not found");
}
