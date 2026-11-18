import React from 'react';
import { PortfolioConfig } from '../../types/portfolio';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { WorkSection } from './WorkSection';
import { CustomContentSection } from './CustomContentSection';
import { ContactSection } from './ContactSection';

interface SectionRendererProps {
  config: PortfolioConfig;
}

/**
 * Extensible Section Registry Renderer.
 * Renders sections in the exact order defined in `portfolioData.sections`,
 * skipping any section where `enabled === false`.
 *
 * To add a new custom section:
 * - Simply add a `{ type: 'custom', enabled: true, data: { ... } }` object
 *   to `portfolioData.sections` in `src/data/portfolioData.ts`.
 * - For bespoke components, add a new `case` below and type in `src/types/portfolio.ts`.
 */
export const SectionRenderer: React.FC<SectionRendererProps> = ({ config }) => {
  return (
    <>
      {config.sections
        .filter((section) => section.enabled)
        .map((section) => {
          switch (section.type) {
            case 'hero':
              return <HeroSection key={section.key} data={config.hero} />;
            case 'about':
              return <AboutSection key={section.key} data={config.about} />;
            case 'work':
              return <WorkSection key={section.key} data={config.work} />;
            case 'custom':
              return (
                <CustomContentSection key={section.key} data={section.data} />
              );
            case 'contact':
              return <ContactSection key={section.key} data={config.contact} />;
            default:
              return null;
          }
        })}
    </>
  );
};
