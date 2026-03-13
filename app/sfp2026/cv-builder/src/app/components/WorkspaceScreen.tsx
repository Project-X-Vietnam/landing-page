import {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { Zap, MousePointerClick } from "lucide-react";
import { ExperienceLevel, CareerTrack, FormulaState } from "../types";
import { CVCanvas } from "./CVCanvas";
import { ExperiencePopover } from "./ExperiencePopover";

interface Props {
  level: ExperienceLevel;
  track: CareerTrack;
}

const POPOVER_WIDTH = 420;
const NAV_HEIGHT = 56;

// ── Helpers ────────────────────────────────────────────────────────

function calcPopoverPos(
  rect: DOMRect
): { top: number; left: number } {
  // Aim to overlap the right edge of the experience block by ~90px
  let left = rect.right - 90;
  // Clamp so popover never exits the right of the viewport
  left = Math.min(left, window.innerWidth - POPOVER_WIDTH - 16);
  // Top: align with experience block top, but never under the nav
  const top = Math.max(NAV_HEIGHT + 12, rect.top - 10);
  return { top, left };
}

// ── Main WorkspaceScreen ────────────────────────────────────────────

export function WorkspaceScreen({ level, track }: Props) {
  const [formula, setFormula] = useState<FormulaState>({
    action: "",
    impact: "",
    method: "",
  });
  const [addedBullets, setAddedBullets] = useState<string[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(true);

  // Refs for position tracking
  const [experienceEl, setExperienceEl] = useState<HTMLDivElement | null>(null);
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Callback ref for the experience section in CVCanvas
  const experienceRef = useCallback((node: HTMLDivElement | null) => {
    setExperienceEl(node);
  }, []);

  // Compute position whenever experienceEl is known or popover opens
  const updatePos = useCallback(() => {
    if (!experienceEl) return;
    const rect = experienceEl.getBoundingClientRect();
    setPopoverPos(calcPopoverPos(rect));
  }, [experienceEl]);

  useLayoutEffect(() => {
    if (popoverOpen) updatePos();
  }, [experienceEl, popoverOpen, updatePos]);

  // Re-compute on scroll (canvas area scroll) and window resize
  useEffect(() => {
    if (!popoverOpen) return;
    const canvas = canvasRef.current;
    const opts = { capture: true, passive: true } as const;
    canvas?.addEventListener("scroll", updatePos, opts);
    window.addEventListener("resize", updatePos, { passive: true });
    return () => {
      canvas?.removeEventListener("scroll", updatePos, opts);
      window.removeEventListener("resize", updatePos);
    };
  }, [popoverOpen, updatePos]);

  const handleFormulaChange = useCallback(
    (field: keyof FormulaState, value: string) =>
      setFormula((prev) => ({ ...prev, [field]: value })),
    []
  );

  const handleAddBullet = useCallback((bullet: string) => {
    setAddedBullets((prev) => [...prev, bullet]);
  }, []);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Scrollable canvas ── */}
      <div
        ref={canvasRef}
        style={{
          flex: 1,
          overflowY: "auto",
          background: "#FAFBFF",
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.065) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          padding: "48px 24px 80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div style={{ width: "100%", maxWidth: 560 }}>
          {/* Hint label above the paper */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
              paddingLeft: 2,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
              }}
            />
            <span
              style={{
                fontSize: 11,
                color: "#94a3b8",
                fontWeight: 500,
              }}
            >
              Experience block selected — builder is active
            </span>
          </div>

          <CVCanvas
            addedBullets={addedBullets}
            experienceRef={experienceRef}
          />

          {/* Bullet count indicator below paper */}
          <AnimatePresence>
            {addedBullets.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: 12,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: "#0E56FA",
                    fontWeight: 600,
                    background: "rgba(14,86,250,0.08)",
                    border: "1px solid rgba(14,86,250,0.15)",
                    padding: "4px 12px",
                    borderRadius: 99,
                  }}
                >
                  ✓ {addedBullets.length} bullet{addedBullets.length > 1 ? "s" : ""} added to Experience
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── Floating Popover (position:fixed, anchored to Experience block) ── */}
      <AnimatePresence>
        {popoverOpen && popoverPos && (
          <ExperiencePopover
            level={level}
            formula={formula}
            onFormulaChange={handleFormulaChange}
            onSave={handleAddBullet}
            onClose={() => setPopoverOpen(false)}
            style={{
              position: "fixed",
              top: popoverPos.top,
              left: popoverPos.left,
              zIndex: 50,
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Re-open pill when popover is dismissed ── */}
      <AnimatePresence>
        {!popoverOpen && (
          <motion.button
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setPopoverOpen(true);
              // Small delay to let state settle before recalculating position
              setTimeout(updatePos, 30);
            }}
            style={{
              position: "fixed",
              bottom: 24,
              right: 24,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "11px 20px",
              background: "#020818",
              color: "white",
              borderRadius: 99,
              fontSize: 13,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              zIndex: 49,
            }}
          >
            <MousePointerClick size={14} />
            Open Experience Builder
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Level change notification ── */}
      <LevelToast level={level} />
    </div>
  );
}

// ── Small toast that flashes when level changes ────────────────────

const LEVEL_COLORS: Record<ExperienceLevel, { bg: string; text: string; border: string }> = {
  beginner: { bg: "#EFF6FF", text: "#0369A1", border: "#BAE6FD" },
  mid: { bg: "#FFFBEB", text: "#B45309", border: "#FDE68A" },
  expert: { bg: "#F5F3FF", text: "#6D28D9", border: "#DDD6FE" },
};

const LEVEL_LABELS: Record<ExperienceLevel, string> = {
  beginner: "Beginner",
  mid: "Mid-level",
  expert: "Expert",
};

function LevelToast({ level }: { level: ExperienceLevel }) {
  const [show, setShow] = useState(false);
  const prevLevel = useRef<ExperienceLevel>(level);

  useEffect(() => {
    if (prevLevel.current !== level) {
      prevLevel.current = level;
      setShow(true);
      const t = setTimeout(() => setShow(false), 2000);
      return () => clearTimeout(t);
    }
  }, [level]);

  const c = LEVEL_COLORS[level];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 12 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            background: c.bg,
            border: `1px solid ${c.border}`,
            borderRadius: 99,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            zIndex: 60,
          }}
        >
          <Zap size={12} color={c.text} />
          <span style={{ fontSize: 12, fontWeight: 600, color: c.text }}>
            Switched to {LEVEL_LABELS[level]} — coach tips updated
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
