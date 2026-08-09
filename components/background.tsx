"use client";

import { motion, useReducedMotion } from "framer-motion";

const ORBS = [
  {
    className: "h-[32rem] w-[32rem] bg-foreground/10 blur-[140px]",
    initial: { x: "-10%", y: "-5%" },
    animate: { x: ["-10%", "-6%", "-10%"], y: ["-5%", "-2%", "-5%"] },
    duration: 18,
  },
  {
    className: "h-[26rem] w-[26rem] bg-muted-foreground/10 blur-[120px]",
    initial: { x: "70%", y: "30%" },
    animate: { x: ["70%", "74%", "70%"], y: ["30%", "26%", "30%"] },
    duration: 22,
  },
  {
    className: "h-[24rem] w-[24rem] bg-foreground/5 blur-[130px]",
    initial: { x: "25%", y: "75%" },
    animate: { x: ["25%", "30%", "25%"], y: ["75%", "70%", "75%"] },
    duration: 20,
  },
];

export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      {ORBS.map((orb, index) => (
        <motion.div
          key={index}
          aria-hidden
          className={`absolute rounded-full ${orb.className}`}
          initial={orb.initial}
          animate={orb.animate}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            ...(prefersReducedMotion ? { repeat: 0, duration: 0 } : {}),
          }}
        />
      ))}
    </div>
  );
}