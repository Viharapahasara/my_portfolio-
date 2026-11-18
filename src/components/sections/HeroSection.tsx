import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { HeroData } from '../../types/portfolio';
import { ResponsiveImage } from '../common/ResponsiveImage';
import { UnderlineAction } from '../common/UnderlineAction';

interface HeroSectionProps {
  data: HeroData;
}

/**
 * Split editorial hero matching the reference visual hierarchy:
 * Left column: greeting, oversized steel-blue role title, tagline, underlined CTAs.
 * Right column: rounded-corner portrait card balanced in height with the copy.
 */
export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const prefersReducedMotion = useReducedMotion();

  const scrollToTarget = (targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section
      id={data.id}
      aria-label="Introduction"
      className="scroll-mt-24 pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-14 lg:pb-24"
    >
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-10">
        {/* Left Column: Typographic Anchor */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center lg:col-span-6"
        >
          <p className="text-base font-medium tracking-wide text-[#F3F4F6] sm:text-xl">
            {data.greeting}
          </p>

          <h1
            className="font-display mt-3 text-[2.75rem] leading-[1.06] font-extrabold tracking-tight text-[#A6B8CA] sm:text-6xl lg:text-[4.25rem]"
            style={{ textWrap: 'balance' }}
          >
            {data.roleTitle}
          </h1>

          {data.tagline && (
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#A1A6AF] sm:text-base">
              {data.tagline}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-7 sm:mt-8">
            <UnderlineAction
              href={`#${data.primaryCtaTarget}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToTarget(data.primaryCtaTarget);
              }}
              className="text-base"
            >
              {data.primaryCtaLabel}
            </UnderlineAction>

            {data.secondaryCtaLabel && data.secondaryCtaTarget && (
              <button
                type="button"
                onClick={() => scrollToTarget(data.secondaryCtaTarget!)}
                className="inline-flex min-h-[40px] items-center gap-1.5 py-2 text-sm font-medium text-[#9CA3AF] transition-colors hover:text-[#F3F4F6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A6B8CA] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{data.secondaryCtaLabel}</span>
                <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Right Column: Clean Vertical Portrait (no heavy boxy frame) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[340px] overflow-hidden rounded-[28px] sm:max-w-[380px] lg:ml-auto lg:max-w-[400px]">
            <ResponsiveImage
              src={data.portraitSrc}
              alt={data.portraitAlt}
              fallbackTitle={data.roleTitle}
              priority
              className="h-full w-full"
              imgClassName="object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#1B1B1D]/80 via-[#1B1B1D]/20 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
