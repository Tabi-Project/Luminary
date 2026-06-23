"use client";

import { FadeInProps } from "@/types/animation.type";
import { motion, useReducedMotion } from "motion/react";

export function FadeIn({
  children,
  delay = 0,
  y = 16,
  inView = false,
  className,
  ...props
}: FadeInProps) {
  const reduceMotion = useReducedMotion();
  const offset = reduceMotion ? 0 : y;

  const transition = {
    duration: 0.5,
    delay,
    ease: "easeOut",
  } as const;

  const motionProps = inView
    ? {
        initial: { opacity: 0, y: offset },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
      }
    : {
        initial: { opacity: 0, y: offset },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
      className={className}
      transition={transition}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.div>
  );
}
