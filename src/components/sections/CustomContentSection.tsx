import React from 'react';
import { CustomSectionData } from '../../types/portfolio';
import { SectionContainer } from '../common/SectionContainer';
import { SectionHeading } from '../common/SectionHeading';
import { StaggerContainer, StaggerItem } from '../common/ScrollReveal';
import { cn } from '../../utils/cn';

interface CustomContentSectionProps {
  data: CustomSectionData;
}

/**
 * Reusable generic section renderer enabling new sections (Services,
 * Experience, Certifications, Testimonials, etc.) to be added directly
 * from `src/data/portfolioData.ts` with zero extra component code.
 */
export const CustomContentSection: React.FC<CustomContentSectionProps> = ({
  data,
}) => {
  const gridCols =
    data.columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <SectionContainer id={data.id} ariaLabel={data.heading}>
      <SectionHeading title={data.heading} intro={data.intro} />

      <StaggerContainer
        staggerDelay={0.08}
        className={cn('grid grid-cols-1 gap-6 sm:gap-7', gridCols)}
      >
        {data.items.map((item) => (
          <StaggerItem
            key={item.id}
            style="scale-up"
            className="flex flex-col justify-between rounded-2xl border border-[#2F3137] bg-[#222327] p-6 transition-colors duration-200 hover:border-[#A6B8CA]/45 sm:p-7"
          >
            <div>
              {item.meta && (
                <span className="font-mono text-xs font-medium tracking-wider text-[#A6B8CA] tabular-nums">
                  {item.meta}
                </span>
              )}

              <h3 className="font-display mt-2 text-xl font-bold tracking-tight text-[#F3F4F6]">
                {item.title}
              </h3>

              {item.subtitle && (
                <p className="mt-1 text-xs font-medium tracking-wide text-[#9CA3AF]">
                  {item.subtitle}
                </p>
              )}

              <p className="mt-4 text-sm leading-relaxed text-[#D1D5DB]">
                {item.description}
              </p>
            </div>

            {item.highlights && item.highlights.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 border-t border-[#2F3137] pt-4 text-xs text-[#9CA3AF]">
                {item.highlights.map((highlight, idx) => (
                  <React.Fragment key={highlight}>
                    <span>{highlight}</span>
                    {idx < item.highlights!.length - 1 && (
                      <span aria-hidden="true" className="text-[#4B5563]">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </StaggerItem>
        ))}
      </StaggerContainer>
    </SectionContainer>
  );
};
