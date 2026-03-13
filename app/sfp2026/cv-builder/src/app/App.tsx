import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Screen1Pillars } from "./components/Screen1Pillars";
import { Screen3Workspace } from "./components/Screen3Workspace";
import { Screen4Finish } from "./components/Screen4Finish";
import { MobileWorkspacePreview } from "./components/MobileWorkspacePreview";
import { DiagnosticLevel } from "./types";
import { trackEvent } from "../utils/analytics";

export default function App() {
  const [screen, setScreen] = useState<1 | 3 | 4>(1);
  const [selectedPillar, setSelectedPillar] = useState<string | null>("product");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [workspaceLevel, setWorkspaceLevel] = useState<DiagnosticLevel>("developing");
  const [builtBullet, setBuiltBullet] = useState<string>("");
  const [showMobile, setShowMobile] = useState(false);

  // Analytics: Track Traffic Source & Time on Page
  useEffect(() => {
    // Track acquisition source
    const params = new URLSearchParams(window.location.search);
    const source = params.get("source") || params.get("utm_source");
    if (source) {
      trackEvent("page_view_source", { source });
    }

    // Measure time on page
    const startTime = Date.now();
    const handleUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackEvent("session_end", { time_on_page_seconds: timeSpent });
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleBulletComplete = (bullet: string) => {
    setBuiltBullet(bullet);
    setScreen(4);
  };

  const handleRestart = () => {
    setScreen(1);
    setSelectedPillar(null);
    setSelectedRole(null);
    setBuiltBullet("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAFBFF",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Mobile Preview full-screen overlay */}
      <AnimatePresence>
        {showMobile && (
          <motion.div
            key="mobile-preview"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            style={{ position: "fixed", inset: 0, zIndex: 9000 }}
          >
            <MobileWorkspacePreview onBack={() => setShowMobile(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mobile Preview Button */}
      {!showMobile && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          onClick={() => setShowMobile(true)}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 8999,
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "10px 18px",
            borderRadius: 99,
            background: "#020818",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "white",
            fontSize: 12.5,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(2,8,24,0.4), 0 1px 4px rgba(0,0,0,0.2)",
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ fontSize: 15 }}>📱</span>
          Mobile Preview
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {screen === 1 && (
          <motion.div
            key="screen-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
          >
            <Screen1Pillars
              selectedPillar={selectedPillar}
              selectedRole={selectedRole}
              onSelectPillar={(p) => {
                setSelectedPillar(p);
                setSelectedRole(null);
              }}
              onSelectRole={(r) => {
                setSelectedRole(r);
                if (r) {
                  trackEvent("role_selected", { role: r });
                }
              }}
              onNext={() => setScreen(3)}
            />
          </motion.div>
        )}

        {screen === 3 && (
          <motion.div
            key="screen-3"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ height: "100vh", display: "flex", flexDirection: "column" }}
          >
            <Screen3Workspace
              level={workspaceLevel}
              onSetLevel={setWorkspaceLevel}
              selectedRole={selectedRole}
              onComplete={handleBulletComplete}
            />
          </motion.div>
        )}

        {screen === 4 && (
          <motion.div
            key="screen-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Screen4Finish bullet={builtBullet} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}