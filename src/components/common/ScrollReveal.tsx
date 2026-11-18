import React from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useAnimation,
  useInView,
} from 'motion/react';
import { cn } from '../../utils/cn';

/* --------------------------------------------------------------------------
 * Core reveal tokens — driven purely by opacity + transform so the browser
 * can composite them on the GPU. Every hook respects prefers-reduced-motion.
 * -------------------------------------------------------------------------*/

const EASING = [0.16, 1, 0.3, 1];
const DURATION = 0.55;

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Optional delay in seconds before entrance starts */
  delay?: number;
  /** Vertical offset in pixels (compositor-only translateY) */
  yOffset?: number;
  /** Entrance direction: 'up' | 'up-left' | 'up-right' | 'left' | 'right' */
  gaze?: 'up' | 'up-left' | 'up-right' | 'left' | 'right';
  /** Custom wrapper classes */
  className?: string;
}

/**
 * Reusable scroll-triggered reveal wrapper.
 * Supports multiple entrance directions; everything stays on GPU-composited
 * properties (`opacity` + `transform`) and disables motion when the user
 * prefers reduced motion.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  yOffset = 22,
  gaze = 'up',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial: Record<string, number> = {
    opacity: 0,
  };

  if (gaze === 'up' || gaze === 'up-left' || gaze === 'up-right') {
    initial.y = yOffset;
  } else if (gaze === 'left') {
    initial.x = -yOffset;
  } else if (gaze === 'right') {
    initial.x = yOffset;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: DURATION,
        delay,
        ease: EASING as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  /** Stagger interval between child items in seconds */
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.08,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  /** Entry style: 'fade-up' (default), 'fade-left', 'fade-right', 'scale-up', 'scale-fade'. */
  style?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale-up' | 'scale-fade';
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  style = 'fade-up',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 22 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: EASING as [number, number, number, number] },
      },
    },
    'fade-left': {
      hidden: { opacity: 0, x: -26 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: EASING as [number, number, number, number] },
      },
    },
    'fade-right': {
      hidden: { opacity: 0, x: 26 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: EASING as [number, number, number, number] },
      },
    },
    'scale-up': {
      hidden: { opacity: 0, y: 16, scale: 0.97 },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: EASING as [number, number, number, number] },
      },
    },
    'scale-fade': {
      hidden: { opacity: 0, scale: 0.94 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.16, 1, 0.27, 1] as [number, number, number, number] },
      },
    },
  };

  return (
    <motion.div
      variants={variants[style]}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Text-fade — reveals each letter of a string with a tiny stagger so a
 * heading feels "typed in" without touching layout.
 */
interface TextFadeProps {
  text: string;
  className?: string;
  staggerMs?: number;
}

export const TextFade: React.FC<TextFadeProps> = ({
  text,
  className = '',
  staggerMs = 22,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || !text) {
    return (
      <span className={cn('font-display font-extrabold tracking-tight', className)}>
        {text}
      </span>
    );
  }

  const letters = text.split('');
  const spanClassName =
    'inline-block overflow-hidden leading-[1.06] text-[#A6B8CA]';

  return (
    <span
      className={cn(
        'font-display font-extrabold tracking-tight',
        className,
        'inline-block'
      )}
    >
      {letters.map((letter, idx) => (
        <motion.span
          key={idx}
          className={spanClassName}
          initial={{ opacity: 0, y: '100%', filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.45,
            delay: idx * (staggerMs / 1000),
            ease: EASING as [number, number, number, number],
          }}
        >
          {letter === ' '
            ? '\u00A0'
            : letter}
        </motion.span>
      ))}
    </span>
  );
};

/**
 * RevealDivider — a short colored bar that starts shrunk out and
 * animates to its full length when the heading scrolls into view.
 */
interface RevealDividerProps {
  className?: string;
  /** Initial width fraction of the visible container (0..1). */
  initialWidth?: number;
  accent?: string;
}

export const RevealDivider: React.FC<RevealDividerProps> = ({
  className = '',
  initialWidth = 0.06,
  accent = 'bg-[#A6B8CA]/55',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'h-[2px] w-full rounded-full',
          accent,
          'opacity-60',
          className
        )}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: initialWidth, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.9 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{
        duration: 0.7,
        ease: EASING as [number, number, number, number],
      }}
      className={cn(
        'h-[2px] w-full origin-left rounded-full',
        accent,
        className
      )}
    />
  );
};

/** Scroll progress bar — same as before, with a more noticeable glow. */
export const ScrollProgressBar: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-[#A6B8CA] shadow-[0_0_8px_2px_rgba(166,184,202,0.25)]"
    />
  );
};
