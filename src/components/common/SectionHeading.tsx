import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '../../utils/cn';
import { RevealDivider } from './ScrollReveal';
import { TextFade } from './ScrollReveal';

interface SectionHeadingProps {
  /** Bold steel-blue section title (e.g., "about", "work", "Contact Me") */
  title: string;
  /** Optional supporting paragraph indented to align with editorial rhythm */
  intro?: string;
  /** Additional container classes */
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  intro,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={cn('mb-12 sm:mb-14', className)}>
      <div className="flex items-center gap-5 sm:gap-8">
        <motion.h2
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 sm:text-5xl lg:text-[3.35rem]"
        >
          <TextFade text={title} className="text-4xl font-extrabold tracking-tight text-[#A6B8CA] sm:text-5xl lg:text-[3.35rem]" staggerMs={25} />
        </motion.h2>

        <RevealDivider />
      </div>

      {intro && (
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-[#D1D5DB] sm:mt-8 sm:ml-[14%] sm:text-[1.05rem]"
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
};