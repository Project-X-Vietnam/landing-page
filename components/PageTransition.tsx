"use client";

import { motion } from "framer-motion";

const transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
