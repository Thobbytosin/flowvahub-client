"use client";
import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import type { FC, ReactNode } from "react";

type RevealWrapperProps = {
  children: ReactNode;
  variants?: Variants;
  animate?: boolean;
};

// Animation Variants
const defaultVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Animation Variants
export const fadeInDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Animation Variants
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Animation Variants
export const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Animation Variants
export const springFadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 12,
    },
  },
};

const RevealWrapper: FC<RevealWrapperProps> = ({
  children,
  variants = defaultVariants,
  animate = false,
}) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView={animate ? undefined : "visible"}
      animate={animate ? "visible" : undefined}
      viewport={{ once: false, amount: 0.2 }}
      className=" h-full w-full"
    >
      {children}
    </motion.div>
  );
};

export default RevealWrapper;
