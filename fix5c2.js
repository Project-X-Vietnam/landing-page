const fs = require("fs");
const file = "app/sfp2026/cv-builder/src/app/components/Screen4Finish.tsx";
let content = fs.readFileSync(file, "utf8");

const actionButtonsRegex =
  /\{\/\* Action Buttons \*\/\}[\s\S]*?Apply for SFP Round 2[\s\S]*?<\/motion\.button>\n\s*<\/motion\.div>/;

const newActionButtons = `{/* [UX FIX - Change 5] Action Buttons (Updated Hierarchy) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Primary CTA (Massive Copy Prompt) */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopy}
              style={{
                width: "100%",
                padding: "20px 24px",
                borderRadius: 14,
                background: copied ? "#22C55E" : "linear-gradient(135deg, #0E56FA 0%, #2563EB 100%)",
                color: "white",
                fontSize: 18,
                fontWeight: 800,
                cursor: "pointer",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                letterSpacing: "-0.03em",
                boxShadow: copied 
                  ? "0 8px 32px rgba(34,197,94,0.4), 0 2px 8px rgba(34,197,94,0.2)"
                  : "0 8px 32px rgba(14,86,250,0.4), 0 2px 8px rgba(14,86,250,0.2)",
                transition: "all 0.2s ease"
              }}
            >
              {copied ? (
                <>
                  <Check size={20} strokeWidth={3} />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  COPY PROMPT TO CHATGPT 
                  <span style={{fontSize:"1.2em"}}>✨</span>
                </>
              )}
            </motion.button>

            {/* Ghost button - Secondary */}
            <button
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: 14,
                border: "1px solid #E2E8F0",
                background: "white",
                color: "#020818",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                letterSpacing: "-0.02em",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "all 0.18s",
              }}
              onClick={() => {
                window.open("https://hrc.larksuite.com/share/base/form/shrus0LafvHlKkON50vUXXv2Hld", "_blank");
              }}
              onMouseEnter={(e) => {
                (e.currentTarget).style.borderColor = "#CBD5E1";
                (e.currentTarget).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget).style.borderColor = "#E2E8F0";
                (e.currentTarget).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              Apply for SFP Round 2
              <ExternalLink size={16} strokeWidth={2.5} />
            </button>

            {/* Ghost button - Download Guide */}
            <button
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: 14,
                border: "1px solid #E2E8F0",
                background: "white",
                color: "#475569",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 9,
                letterSpacing: "-0.02em",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "all 0.18s",
              }}
              onClick={() => {
                 window.open("https://projectx.vn", "_blank");
              }}
              onMouseEnter={(e) => {
                (e.currentTarget).style.borderColor = "#CBD5E1";
                (e.currentTarget).style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget).style.borderColor = "#E2E8F0";
                (e.currentTarget).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              <Download size={15} strokeWidth={2} />
              Save Guide (PDF) & CV Template
            </button>
          </motion.div>`;

// Note the `\r\n` handling for windows line endings!
const generalizedRegex =
  /\{\/\* Action Buttons \*\/\}[\s\S]*?Apply for SFP Round 2[\s\S]*?<\/motion\.button>\s*<\/motion\.div>/;

if (generalizedRegex.test(content)) {
  content = content.replace(generalizedRegex, newActionButtons);
  fs.writeFileSync(file, content);
  console.log("Replaced buttons");
} else {
  console.log("Buttons not found");
}
