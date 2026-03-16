const fs = require('fs');
let content = fs.readFileSync('app/sfp2026/cv-builder/src/app/components/Screen3Workspace.tsx', 'utf8');

const reps = ['header', 'summary', 'experience', 'projects'];
reps.forEach(id => {
  content = content.replace(
    new RegExp(`<CVSectionBlock(\\r?\\n|\\s+)id="${id}"`, 'g'),
    `<CVSectionBlock
                bubbleData={activeSection === "${id}" ? getBubbleData("${id}") : null}
                id="${id}"`
  );
});

fs.writeFileSync('app/sfp2026/cv-builder/src/app/components/Screen3Workspace.tsx', content);
