import React from 'react';
import { AboutData } from '../../types/portfolio';
import { SectionContainer } from '../common/SectionContainer';
import { SectionHeading } from '../common/SectionHeading';
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../common/ScrollReveal';

type ScrollGaze =
  | 'up'
  | 'up-left'
  | 'up-right'
  | 'left'
  | 'right';

interface AboutSectionProps {
  data: AboutData;
}

/**
 * Editorial About section with signature heading + extending horizontal rule,
 * offset bio paragraphs, and a clean 3-column underlined discipline grid.
 */
export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  return (
    <SectionContainer id={data.id} ariaLabel="About">
      <SectionHeading title={data.heading} />

      {/* Offset Bio Prose — alternating left/right gaze */}
      <div className="flex flex-col gap-4 sm:ml-[14%] sm:max-w-2xl">
        {data.paragraphs.map((paragraph, index) => {
          const gaze: ScrollGaze =
            index % 2 === 0 ? 'up-left' : 'up-right';
          return (
            <ScrollReveal key={index} gaze={gaze} yOffset={28} className="">
              <p className="text-base leading-relaxed text-[#D1D5DB] sm:text-[1.05rem]">
                {paragraph}
              </p>
            </ScrollReveal>
          );
        })}
      </div>

      {/* Centered skill/experience metrics */}
      <StaggerContainer
        staggerDelay={0.09}
        className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-10 border-t border-[#2F3137]/70 pt-12 sm:gap-x-12 sm:gap-y-12 lg:mt-16 lg:pt-14"
      >
        {data.skills.map((skill) => (
          <StaggerItem
            key={skill.id}
            style="fade-up"
            className="flex w-full max-w-[18rem] flex-col items-center text-center sm:w-64 lg:w-72"
          >
            <h3 className="font-display text-2xl font-bold tracking-tight text-[#F3F4F6] sm:text-[1.75rem]">
              {skill.title}
            </h3>

            <p className="mt-2 inline-block border-b-2 border-[#A6B8CA]/70 pb-1 font-mono text-xs font-medium tracking-wide text-[#D1D5DB] tabular-nums sm:text-sm">
              {skill.experience}
            </p>

            {skill.detail && (
              <p className="mt-3 max-w-[26ch] text-xs leading-relaxed text-[#9CA3AF] sm:text-sm">
                {skill.detail}
              </p>
            )}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionContainer>
  );
};
