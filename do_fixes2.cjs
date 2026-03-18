const fs = require('fs');
const file = 'd:/ProjectX_Package-CV/landing-page-repo/app/sfp2026/cv-builder/src/app/components/Screen3Workspace.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace TOUR
code = code.replace(/const TOUR_CONTENT = \[(.|\n)*?\];/g, \const TOUR_CONTENT = [
    {
      title: "?? Interactive CV",
      description: "Click any section on this CV to discover the criteria HR is looking for.",
      buttonText: "Next ?",
    },
    {
      title: "? Level Switcher",
      description: "Toggle between levels here to see how HR expectations evolve.",
      buttonText: "Next ?",
    },
    {
      title: "? Self-Audit Checklist",
      description: "Audit your CV against these points to unlock an exclusive AI prompt.",
      buttonText: "Got it! ??",
    },
];\);

code = code.replace(/B? qua tour/g, 'Skip tour');
code = code.replace(/>Tour</g, '>Guidance<');
code = code.replace(/CV C?a B?n/g, 'Your CV');
code = code.replace(/Phân Tích Chi Ti?t/g, 'Detail Analysis');
code = code.replace(/Quay l?i/g, 'Back');
code = code.replace(/Luu thành hình ?nh/g, 'Save as image');
code = code.replace(/Chia s?/g, 'Share');

code = code.replace(/className="cv-left-scroll"/g, 'className="cv-left-scroll pb-32"');

code = code.replace(/Senior Product Lead/g, 'Associate Product Manager');
code = code.replace(/Group Product Manager/g, 'Product Management Intern');
code = code.replace(/Product Manager/g, 'Junior Product Manager');
code = code.replace(/Junior Junior Product Manager/g, 'Junior Product Manager');

fs.writeFileSync(file, code);
"
node do_fixes2.cjs
