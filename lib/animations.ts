import { Variants } from "framer-motion";

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4 },
  },
};

// ============================================================================
// STAGGER (For grids and lists)
// ============================================================================

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ============================================================================
// HOVER & INTERACTION EFFECTS
// ============================================================================

export const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

export const liftOnHover: Variants = {
  initial: { y: 0, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  hover: {
    y: -4,
    boxShadow: "0 12px 24px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

export const imageZoomOnHover: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// SLIDE IN / OUT (For sidebars, modals, mobile menus)
// ============================================================================

export const slideInFromRight: Variants = {
  initial: { x: "100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const slideInFromLeft: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const slideInFromBottom: Variants = {
  initial: { y: 50, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// ============================================================================
// CARD ENTRY (Hero cards, product cards)
// ============================================================================

export const cardReveal: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================================================
// BUTTON EFFECTS
// ============================================================================

export const buttonPress: Variants = {
  initial: { scale: 1 },
  tap: {
    scale: 0.96,
    transition: {
      duration: 0.1,
    },
  },
};

export const buttonRipple: Variants = {
  initial: { scale: 0, opacity: 0.5 },
  tap: {
    scale: 2,
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
};

// ============================================================================
// LOADING & SKELETON
// ============================================================================

export const shimmer: Variants = {
  initial: { backgroundPosition: "200% 0" },
  animate: {
    backgroundPosition: "-200% 0",
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear",
    },
  },
};

export const pulse: Variants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: 1,
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

// ============================================================================
// CART & NOTIFICATION
// ============================================================================

export const cartBounce: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 0.9, 1.1, 1],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export const toastNotification: Variants = {
  initial: { opacity: 0, y: 50, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================================================
// DROPDOWN & MENU
// ============================================================================

export const dropdownReveal: Variants = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: {
      duration: 0.15,
    },
  },
};

// ============================================================================
// IMAGE GALLERY (Product detail)
// ============================================================================

export const imageGalleryTransition: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  }),
};

// ============================================================================
// TEXT ANIMATIONS (For hero, headings)
// ============================================================================

export const textReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const letterReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ============================================================================
// FILTER SIDEBAR (Mobile)
// ============================================================================

export const filterSidebar: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 250,
    },
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ============================================================================
// BACKDROP OVERLAY
// ============================================================================

export const backdropOverlay: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================================================
// SCROLL REVEAL (For sections)
// ============================================================================

export const scrollReveal: Variants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// ============================================================================
// EXPORT ALL VARIANTS
// ============================================================================

export const animations = {
  pageTransition,
  fadeInUp,
  fadeIn,
  staggerContainer,
  staggerItem,
  scaleOnHover,
  liftOnHover,
  imageZoomOnHover,
  slideInFromRight,
  slideInFromLeft,
  slideInFromBottom,
  cardReveal,
  buttonPress,
  buttonRipple,
  shimmer,
  pulse,
  cartBounce,
  toastNotification,
  dropdownReveal,
  imageGalleryTransition,
  textReveal,
  letterReveal,
  filterSidebar,
  backdropOverlay,
  scrollReveal,
};
