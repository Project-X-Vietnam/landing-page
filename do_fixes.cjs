const fs = require('fs');
const file = 'd:/ProjectX_Package-CV/landing-page-repo/app/sfp2026/cv-builder/src/app/components/Screen3Workspace.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace TOUR
code = code.replace(/const TOUR_CONTENT = \[([\s\S]*?)\];/g, `const TOUR_CONTENT = [
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
];`);

// Fix skip tour & headers
code = code.replace(/Bỏ qua tour/g, 'Skip tour');
code = code.replace(/>Tour</g, '>Guidance<');
code = code.replace(/CV Của Bạn/g, 'Your CV');
code = code.replace(/Phân Tích Chi Tiết/g, 'Detail Analysis');
code = code.replace(/Quay lại/g, 'Back');
code = code.replace(/Lưu thành hình ảnh/g, 'Save as image');
code = code.replace(/Chia sẻ/g, 'Share');


// Fix HR Bubble overlay
code = code.replace(/className="cv-left-scroll"/g, 'className="cv-left-scroll pb-32"');

// Fix CV_DATA to Fresher/Intern
code = code.replace(/"Senior Product Lead"/g, '"Associate Product Manager"');
code = code.replace(/Product Manager/g, 'Junior Product Manager');
code = code.replace(/"Group Junior Product Manager"/g, '"Product Management Intern"');

// More bullet points replacements for Junior level
code = code.replace(/"Led a cross-functional team of 15 to launch ACME's new AI predictive tool, resulting in a 40% increase in user retention within Q1"/g, '"Collaborated with engineers and designers to launch ACME\\'s new AI predictive tool MVP, completing QA testing ahead of schedule"');
code = code.replace(/"Scaled product line revenue from \$2M to \$18M ARR over 2 years by entering European markets"/g, '"Conducted market research across European segments, providing actionable insights that informed the roadmap for a 15% user base growth initiative"');
code = code.replace(/"Directed the integration of 3rd-party financial APIs, reducing processing time by 30% and saving 20h\/week in manual operations"/g, '"Assisted in documenting requirements for 3rd-party API integrations, streamlining the handoff process to development"');
code = code.replace(/"Introduced quantitative metrics framework that decreased customer churn by 12% year-over-year"/g, '"Created dashboard reports tracking daily active users, identifying a drop-off flow that decreased churn by 5% when fixed"');
code = code.replace(/"Instituted agile best practices across 4 sprint teams, increasing delivery velocity by 25%"/g, '"Facilitated daily stand-ups for a sprint team, ensuring bug tickets were prioritized and blockages were logged"');

// More bullet points replacements for Intern level
code = code.replace(/"Spearheaded the company-wide transition to a microservices architecture, managing \$5M budget and aligning 4 VP-level stakeholders"/g, '"Led user interviews with 15 target customers, gathering pain points that shaped the new onboarding flow mockups"');
code = code.replace(/"Drove acquisition strategy for 2 key competitors, successfully integrating their user bases without losing active users"/g, '"Analyzed competitor features and compiled a benchmarking report to support the lead PM\\'s strategy"');
code = code.replace(/"Built and mentored a team of 12 PMs and UX researchers, achieving highest department eNPS score 2 years in a row"/g, '"Collaborated with marketing to write release notes and help center articles for the Q3 feature launch"');
code = code.replace(/"Pioneered ML-driven personalization engine that boosted checkout conversion by 22% resulting in \$8M incremental revenue"/g, '"Tested and QA\\'d the new personalization engine flow, logging over 30 edge-case bugs that were resolved prior to release"');
code = code.replace(/"Authored technical whitepapers and presented at industry conferences, establishing company as thought leader in FinTech APIs"/g, '"Organized feedback from beta testers into structured Jira epics, saving the product team 10 hours of triage work"');


fs.writeFileSync(file, code);
console.log("Done");
