import { Variants } from 'motion/react';

/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR ANIMATION SYSTEM — Micro-Interactions ║
 * ║  Variants para Framer Motion (motion)       ║
 * ╚═══════════════════════════════════════════╝
 */

export const transitionMd = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const fadeInUp: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: transitionMd
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export const scaleUp: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: transitionMd
  }
};

export const hoverScale: Variants = {
  hover: { 
    scale: 1.02, 
    y: -4,
    boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  tap: { scale: 0.98 }
};

export const shake: Variants = {
  error: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  }
};

export const slideInRight: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: transitionMd
  }
};

export const slideOutLeft: Variants = {
  exit: { x: -50, opacity: 0, transition: { duration: 0.2 } }
};
