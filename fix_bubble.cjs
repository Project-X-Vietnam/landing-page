const fs = require('fs');
const path = require('path');
const file = 'D:/ProjectX_Package-CV/landing-page-repo/app/sfp2026/cv-builder/src/app/components/Screen3Workspace.tsx';
let txt = fs.readFileSync(file, 'utf8');

// Step 1: Add id prop to the outer div of CVSectionBlock so we can query it
txt = txt.replace(
  '    <div\n      onMouseEnter={() => onHover(id)}\n      onMouseLeave={() => onHover(null)}\n      onClick={() => onClick(id)}',
  '    <div\n      id={cv-section-\}\n      onMouseEnter={() => onHover(id)}\n      onMouseLeave={() => onHover(null)}\n      onClick={() => onClick(id)}'
);

// Step 2: In LeftCVColumn, remove <HRQuoteBubble />
txt = txt.replace(
  '<AnimatePresence mode="wait">\n          <HRQuoteBubble\n            key={activeSection + level}\n            section={activeSection}\n            level={level}\n            selectedRole={selectedRole}\n          />\n        </AnimatePresence>',
  ''
);

// Step 3: Inject <HRQuoteBubble /> into Screen3Workspace directly
txt = txt.replace(
  '          <RightInsightPanel\n            section={activeSection}',
  '          <RightInsightPanel\n            section={activeSection}'
);

// We need to insert <HRQuoteBubble activeSection={activeSection} ... /> inside Screen3Workspace, right after handleContinue
// Let's modify Screen3Workspace
txt = txt.replace(
  '<TourOverlay\n            step={tourStep}\n            onNext={handleTourNext}\n            onSkip={handleTourSkip}\n          />\n        )}',
  '<TourOverlay\n            step={tourStep}\n            onNext={handleTourNext}\n            onSkip={handleTourSkip}\n          />\n        )}\n\n        <HRQuoteBubble \n          section={activeSection} \n          level={level} \n          selectedRole={selectedRole} \n        />'
);

// Step 4: Update HRQuoteBubble to use fixed positioning and event listeners
// Let's replace the whole HRQuoteBubble component

const newHRQuoteBubble = unction HRQuoteBubble({
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

  const [pos, setPos] = useState<{ top: number; left: number; isMobile: boolean, visible: boolean }>({
    top: 0,
    left: 0,
    isMobile: false,
    visible: false
  });

  useEffect(() => {
    const updatePos = () => {
      if (window.innerWidth < 768) {
        setPos({ top: 0, left: 0, isMobile: true, visible: true });
        return;
      }
      
      const el = document.getElementById(\cv-section-\\);
      if (el) {
        const rect = el.getBoundingClientRect();
        
        let calculatedTop = Math.max(80, rect.top);
        // clamp to screen bottom
        if (calculatedTop + 240 > window.innerHeight) {
          calculatedTop = window.innerHeight - 260;
        }

        let calculatedLeft = rect.right + 16;
        if (calculatedLeft + 440 > window.innerWidth) {
            calculatedLeft = rect.left - 440 - 16; // flip to left side
            if(calculatedLeft < 10) calculatedLeft = 10;
        }

        setPos({
          top: calculatedTop,
          left: calculatedLeft,
          isMobile: false,
          visible: true
        });
      }
    };

    updatePos();
    window.addEventListener('resize', updatePos);
    
    // Add scroll listener if the container scrolls independently
    const container = document.querySelector('.cv-scroll-container'); // Need to check if there is one
    if (container) container.addEventListener('scroll', updatePos);
    
    return () => {
      window.removeEventListener('resize', updatePos);
      if (container) container.removeEventListener('scroll', updatePos);
    };
  }, [section]);

  if (!pos.visible) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={section + level}
        initial={pos.isMobile ? { y: '100%' } : { opacity: 0, y: 12, scale: 0.96 }}
        animate={pos.isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
        exit={pos.isMobile ? { y: '100%' } : { opacity: 0, y: 12, scale: 0.96 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
        style={pos.isMobile ? {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: "white",
          padding: "20px 22px",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          boxShadow: "0 -4px 24px rgba(0,0,0,0.1)",
        } : {
          position: "fixed",
          top: pos.top,
          left: pos.left,
          zIndex: 9999,
          width: 440,
          borderRadius: 16,
          border: "1px solid rgba(226, 232, 240, 0.8)",
          background: "white",
          padding: "20px 22px",
          boxShadow: "0 12px 40px rgba(2, 8, 24, 0.08), 0 4px 12px rgba(2, 8, 24, 0.04)",
          transition: "top 200ms ease, left 200ms ease" // smooth movement
        }}
      >
        {/* Speech bubble tail - only show on desktop and if positioned on right */}
        {!pos.isMobile && pos.left > 200 && (
          <div
            style={{
              position: "absolute",
              top: 24, // Align slightly down
              left: -10, // pointing left to the CV
              width: 0,
              height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderRight: "10px solid white",
              filter: "drop-shadow(-2px 0px 1px rgba(226, 232, 240, 0.8))"
            }}
          />
        )};

// replace the old one
let startIdx = txt.indexOf('function HRQuoteBubble({');
let endIdx = txt.indexOf('} // End of Screen3Workspace ? No wait');
// We need a precise way to slice it out.
// Wait, replacing it with regex...
