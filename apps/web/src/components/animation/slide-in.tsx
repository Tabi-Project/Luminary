"use client";

import { motion, useReducedMotion } from "motion/react";
import { SlideInProps } from "@/types/animation.type";

export function SlideIn({
  children,
  from,
  distance = 40,
  className,
  duration = 0.3,
}: SlideInProps) {
  const reduceMotion = useReducedMotion();
  const x = reduceMotion ? 0 : from === "left" ? -distance : distance;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
