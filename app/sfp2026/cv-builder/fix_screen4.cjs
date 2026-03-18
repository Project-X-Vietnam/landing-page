const fs = require("fs");
const file =
  "D:/ProjectX_Package-CV/landing-page-repo/app/sfp2026/cv-builder/src/app/components/Screen4Finish.tsx";
let content = fs.readFileSync(file, "utf8");

// Replace handleCopy
content = content.replace(
  "navigator.clipboard.writeText(bullet)",
  "navigator.clipboard.writeText(currentPrompt)",
);

const newCTA = `
          <button
            onClick={handleCopy}
            style={{
              width: "100%",
              padding: "20px 32px",
              borderRadius: 12,
              background: copied ? "#22C55E" : "#0E56FA",
              color: "white",
              fontSize: 18,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              border: "none",
              boxShadow: "0 8px 24px rgba(14,86,250,0.25)",
              transition: "all 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              if(!copied) Object.assign(e.currentTarget.style, { transform: 'translateY(-2px)', boxShadow: '0 12px 32px rgba(14,86,250,0.35)' });
            }}
            onMouseOut={(e) => {
              if(!copied) Object.assign(e.currentTarget.style, { transform: 'translateY(0)', boxShadow: '0 8px 24px rgba(14,86,250,0.25)' });
            }}
          >
            {copied ? "Copied! ✓" : "Copy Your AI Rewrite Prompt ✨"}
          </button>

          <div
            style={{
              fontSize: 12,
              color: "#6B7280",
              textAlign: "center",
              marginTop: 4,
            }}
          >
            Works with ChatGPT, Claude, Gemini & more
          </div>
`;

content = content.replace(
  /\{\/\* Primary CTA \(Massive Copy Prompt\) \*\/\}[\s\S]*?Paste into any AI tool to instantly tailor and strengthen your CV[\s\n]*bullets[\s\n]*<\/div>/,
  "{/* Primary CTA (Massive Copy Prompt) */}\n" + newCTA,
);

// We need to check if the regex match actually worked
console.log("Did match?", /\{\/\* Primary CTA/.test(content));

fs.writeFileSync(file, content);
console.log("Done");
