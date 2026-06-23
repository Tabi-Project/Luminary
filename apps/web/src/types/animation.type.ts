import { HTMLMotionProps } from "motion/react";
import { ReactNode } from "react";

export interface StaggerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
}

export interface StaggerItemProps {
  children: ReactNode;
  y?: number;
  className?: string;
}

export type FadeInProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  inView?: boolean;
  className?: string;
} & Omit<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "whileInView" | "viewport" | "transition"
>;

export interface SlideInProps {
  distance?: number;
  className?: string;
  children: ReactNode;
  duration?: number;
  from: "left" | "right";
}
