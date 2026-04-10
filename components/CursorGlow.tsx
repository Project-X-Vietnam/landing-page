"use client";

import { useEffect } from "react";

const DEFAULT_GLOW = `radial-gradient(
  circle,
  rgba(23, 202, 250, 0.10) 0%,
  rgba(14, 86, 250, 0.06) 35%,
  transparent 70%
)`;

const INTERACTIVE_GLOW = `radial-gradient(
  circle,
  rgba(23, 202, 250, 0.16) 0%,
  rgba(14, 86, 250, 0.10) 35%,
  transparent 65%
)`;

const INTERACTIVE_SELECTOR =
  "button, a, .platform-card, .prompt-card, .tab, .step-row";

export default function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) {
      return;
    }

    const glow = document.createElement("div");
    glow.id = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    glow.style.background = DEFAULT_GLOW;
    document.body.appendChild(glow);

    let glowX = 0;
    let glowY = 0;
    let currentX = 0;
    let currentY = 0;
    let visible = false;
    let frameId = 0;

    const handleMouseMove = (event: MouseEvent) => {
      glowX = event.clientX;
      glowY = event.clientY;

      if (!visible) {
        glow.style.opacity = "1";
        visible = true;
      }
    };

    const handleMouseLeave = () => {
      glow.style.opacity = "0";
      visible = false;
    };

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR)) {
        glow.style.width = "600px";
        glow.style.height = "600px";
        glow.style.background = INTERACTIVE_GLOW;
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (target.closest(INTERACTIVE_SELECTOR)) {
        glow.style.width = "400px";
        glow.style.height = "400px";
        glow.style.background = DEFAULT_GLOW;
      }
    };

    const animateGlow = () => {
      currentX += (glowX - currentX) * 0.08;
      currentY += (glowY - currentY) * 0.08;
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;
      frameId = window.requestAnimationFrame(animateGlow);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    animateGlow();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.cancelAnimationFrame(frameId);
      glow.remove();
    };
  }, []);

  return null;
}
