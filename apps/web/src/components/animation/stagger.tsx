"use client";

import { StaggerItemProps, StaggerProps } from "@/types/animation.type";
import { motion, useReducedMotion, type Variants } from "motion/react";

/**
 * Container that reveals its {@link StaggerItem} children one after another as
 * it scrolls into view.
 */
export function Stagger({ children, stagger = 0.15, className }: StaggerProps) {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/** A single cascading item. Must be a direct child of {@link Stagger}. */
export function StaggerItem({ children, y = 24, className }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : y;

  const variants: Variants = {
    hidden: { opacity: 0, y: offset },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
