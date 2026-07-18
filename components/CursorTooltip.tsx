"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CursorTooltip({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative inline-block"
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 4 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="fixed pointer-events-none z-[70]"
            style={{
              left: position.x + 10,
              top: position.y + 10,
            }}
          >
            <div className="rounded-[9px] bg-[#07132c] px-3 py-1.5 text-xs font-medium text-white shadow-[0_16px_50px_rgba(7,19,44,0.18)]">
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
