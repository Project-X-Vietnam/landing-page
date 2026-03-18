const fs = require("fs");

function processFile(file) {
  if (!fs.existsSync(file)) {
    console.log("Not found:", file);
    return;
  }
  let code = fs.readFileSync(file, "utf8");

  // 1. Remove HR Quote Block 1 from RightInsightPanel
  // Fix the block replacement using the comments
  const s1 = code.indexOf("HR Quote with Company Logo");
  if (s1 !== -1) {
    let toReplaceStart = code.lastIndexOf("{/*", s1);

    let s2 = code.indexOf("Step Checklist", s1);
    let toReplaceEnd = code.lastIndexOf("{/*", s2);

    if (
      toReplaceStart !== -1 &&
      toReplaceEnd !== -1 &&
      !code.substring(toReplaceStart, toReplaceEnd).includes("HRQuoteBubble")
    ) {
      code = code.substring(0, toReplaceStart) + code.substring(toReplaceEnd);
      console.log("Removed Block 1");
    }
  }

  // 2. Add HRQuoteBubble component if not exists
  if (!code.includes("HRQuoteBubble")) {
    const hrBubbleCode = `
// ─── HR Quote Floating Bubble ──────────────────────────────────────────────────

function HRQuoteBubble({
  section,
  level,
  selectedRole,
}: {
  section: CVSection;
  level: DiagnosticLevel;
  selectedRole: string | null;
}) {
  const data = PANEL_DATA[section][level];
  const roleData = getRoleLevelData(selectedRole, level);
  const hrQuote =
    (roleData as any).hrQuotes?.[section] ||
    (roleData as any).hrQuote ||
    data.hrQuote;
  const hrName = roleData.hrName;
  const hrRole = roleData.hrRole;
  const hrCompany = roleData.hrCompany;
  const companyInfo = COMPANY_INFO[hrCompany];

  return (
    <motion.div
      key={section + level}
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.32, ease: "easeOut" }}
      style={{
        position: "absolute",
        bottom: 24,
        left: 24,
        width: 440,
        zIndex: 50,
        borderRadius: 16,
        border: "1px solid rgba(226, 232, 240, 0.8)",
        background: "white",
        padding: "20px 22px",
        boxShadow: "0 12px 40px rgba(2, 8, 24, 0.08), 0 4px 12px rgba(2, 8, 24, 0.04)",
      }}
    >
      {/* Speech bubble tail */}
      <div 
        style={{
          position: 'absolute',
          top: -10,
          left: 36,
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '11px solid white',
          filter: 'drop-shadow(0 -2px 1px rgba(0,0,0,0.05))'
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            border: "2px solid #F8FAFC",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}
        >
          <img
            src={data.hrAvatar === "man" ? AVATAR_MAN : AVATAR_WOMAN}
            alt={hrName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 3,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#0f172a",
                letterSpacing: "-0.01em",
              }}
            >
              {hrName}
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "3px 8px 3px 6px",
                borderRadius: 6,
                background: companyInfo.color,
                boxShadow: \`0 2px 8px \${companyInfo.color}40\`,
              }}
            >
              <Building2
                size={10}
                color={companyInfo.textColor}
                strokeWidth={2.5}
                style={{ opacity: 0.9 }}
              />
              <span
                style={{
                  fontSize: 9.5,
                  fontWeight: 800,
                  color: companyInfo.textColor,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {companyInfo.name}
              </span>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: "#64748b", fontWeight: 500 }}>
            {hrRole}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 10px",
            borderRadius: 8,
            background: "#F0FDF4",
            border: "1px solid #BBF7D0",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#16a34a",
              boxShadow: "0 0 0 2px rgba(22,163,74,0.2)"
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#16a34a",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Verified
          </span>
        </div>
      </div>
      
      <div style={{ position: "relative" }}>
        <p
          style={{
            fontSize: 13.5,
            color: "#334155",
            lineHeight: 1.6,
            margin: 0,
            fontStyle: "italic",
            letterSpacing: "-0.01em",
          }}
        >
          "{hrQuote}"
        </p>
      </div>
    </motion.div>
  );
}
`;
    // Insert before RightInsightPanel
    let leftColStart = code.lastIndexOf("function RightInsightPanel");
    if (leftColStart !== -1) {
      code =
        code.substring(0, leftColStart) +
        hrBubbleCode +
        "\n" +
        code.substring(leftColStart);
    }
  }

  // 3. Render HRQuoteBubble in LeftCVColumn
  // Make wrapper relative
  const wrapperTarget = `      <div
        className="cv-left-scroll"
        style={{
          width: "50%",`;

  if (
    code.includes(wrapperTarget) &&
    !code.includes(
      `flexDirection: "column" }}>\n      <div\n        className="cv-left-scroll"`,
    )
  ) {
    code = code.replace(
      wrapperTarget,
      `      <div style={{ position: "relative", width: "50%", display: "flex", flexDirection: "column" }}>
      <div
        className="cv-left-scroll"
        style={{
          flex: 1,
          width: "100%",`,
    );

    // Close the new wrapper div and add HRQuoteBubble
    const endOfLeftCol = `          </div>
        </div>
      </div>
    </>
  );
}`;
    const leftCVEndFix = `          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <HRQuoteBubble key={activeSection+level} section={activeSection} level={level} selectedRole={selectedRole} />
      </AnimatePresence>
      </div>
    </>
  );
}`;
    code = code.replace(endOfLeftCol, leftCVEndFix);
  }

  fs.writeFileSync(file, code);
  console.log("Processed " + file);
}

processFile(
  "d:\\ProjectX_Package-CV\\landing-page-repo\\app\\sfp2026\\cv-builder\\src\\app\\components\\Screen3Workspace.tsx",
);
