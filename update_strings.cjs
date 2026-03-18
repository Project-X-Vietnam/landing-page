const fs = require("fs");

const file =
  "d:/ProjectX_Package-CV/landing-page-repo/app/sfp2026/cv-builder/src/app/components/Screen3Workspace.tsx";
let code = fs.readFileSync(file, "utf8");

// Replace TOUR
code = code.replace(
  /const TOUR_CONTENT = \[([\s\S]*?)\];/g,
  `const TOUR_CONTENT = [
    {
      title: "📄 Interactive CV",
      description: "Click any section on this CV to discover the criteria HR is looking for.",
      buttonText: "Next →",
    },
    {
      title: "⚡ Level Switcher",
      description: "Toggle between levels here to see how HR expectations evolve.",
      buttonText: "Next →",
    },
    {
      title: "✅ Self-Audit Checklist",
      description: "Audit your CV against these points to unlock an exclusive AI prompt.",
      buttonText: "Got it! 🎉",
    },
];`,
);

// Fix skip tour & headers
code = code.replace(/Bỏ qua tour/g, "Skip tour");
code = code.replace(/>Tour</g, ">Guidance<");
code = code.replace(/CV Của Bạn/g, "Your CV");
code = code.replace(/Phân Tích Chi Tiết/g, "Detail Analysis");
code = code.replace(/Quay lại/g, "Back");
code = code.replace(/Lưu thành hình ảnh/g, "Save as image");
code = code.replace(/Chia sẻ/g, "Share");
code = code.replace(/Tiếp theo/g, "Next");
code = code.replace(/Hoặc xem Tour/g, "Or see guidance");

// Fix HR Bubble overlay
code = code.replace(
  /className="cv-left-scroll"/g,
  'className="cv-left-scroll pb-32"',
);
// wait, the problem could be `HRQuoteBubble` covers text. Absolute at bottom usually covers content at bottom of scroll.
// adding pb-32 to cv-left-scroll helps.
// Also modify left of HRQuoteBubble
code = code.replace(/left: 24,/g, "left: 24, zIndex: 10,");

code = code.replace(/"Senior Product Lead"/g, '"Associate Product Manager"');
code = code.replace(/"Group Product Manager"/g, '"Product Management Intern"');
code = code.replace(/Product Manager/g, "Junior Product Manager");
code = code.replace(/Junior Junior Product Manager/g, "Junior Product Manager");

fs.writeFileSync(file, code);
console.log("Done fixes strings");
