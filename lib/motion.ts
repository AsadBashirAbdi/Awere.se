// Shared motion constants for consistent animation across the app

export const transition = {
  duration: 0.3,
  ease: [0.25, 1, 0.5, 1],
} as const;

export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition,
} as const;

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition,
} as const;

export const scalePress = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.1 },
} as const;
