import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Screen1Pillars } from "./components/Screen1Pillars";
import { Screen3Workspace } from "./components/Screen3Workspace";
import { Screen4Finish } from "./components/Screen4Finish";
import { WelcomePage } from "./components/WelcomePage";

import { DiagnosticLevel } from "./types";
import { trackEvent } from "../utils/analytics";

export default function App() {
  const [screen, setScreen] = useState<0 | 1 | 3 | 4>(0);
  const [selectedPillar, setSelectedPillar] = useState<string | null>("product");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [workspaceLevel, setWorkspaceLevel] = useState<DiagnosticLevel>("developing");
  const [builtBullet, setBuiltBullet] = useState<string>("");


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

      <AnimatePresence mode="wait">
        {screen === 0 && (
          <motion.div
            key="screen-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
          >
            <WelcomePage onStart={() => setScreen(1)} />
          </motion.div>
        )}

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
              onBack={() => setScreen(1)}
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
            style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}
          >
            <Screen4Finish aiPrompt={builtBullet} bullet={builtBullet} onRestart={handleRestart} onBack={() => setScreen(3)} selectedRole={selectedRole} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}