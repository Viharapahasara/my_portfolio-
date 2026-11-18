import React from 'react';
import { cn } from '../../utils/cn';

interface SectionContainerProps {
  /** Anchor ID used for smooth navigation links */
  id: string;
  /** Inner section content */
  children: React.ReactNode;
  /** Optional custom Tailwind classes */
  className?: string;
  /** Accessible label for landmark navigation */
  ariaLabel?: string;
}

/**
 * Standard horizontal container and vertical rhythm wrapper shared across
 * every portfolio section so spacing stays consistent on mobile and desktop.
 */
export const SectionContainer: React.FC<SectionContainerProps> = ({
  id,
  children,
  className,
  ariaLabel,
}) => {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn(
        'scroll-mt-24 py-16 sm:py-20 lg:py-24',
        className
      )}
    >
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
};
