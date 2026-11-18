import React, { useMemo, useState } from 'react';
import { ArrowUpRight, Images } from 'lucide-react';
import { ProjectItem, WorkData } from '../../types/portfolio';
import { SectionContainer } from '../common/SectionContainer';
import { SectionHeading } from '../common/SectionHeading';
import { ResponsiveImage } from '../common/ResponsiveImage';
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from '../common/ScrollReveal';
import { ProjectModal } from '../modals/ProjectModal';
import { cn } from '../../utils/cn';

interface WorkSectionProps {
  data: WorkData;
}

/**
 * Portfolio Work showcase featuring interactive category filter controls,
 * a 2-column project grid matching the reference card framing, and a
 * case study modal when clicking any project.
 */
export const WorkSection: React.FC<WorkSectionProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  // Derive filter categories automatically from portfolioData.ts
  const categories = useMemo(() => {
    const unique = Array.from(new Set(data.projects.map((p) => p.category)));
    return ['All', ...unique];
  }, [data.projects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return data.projects;
    return data.projects.filter((p) => p.category === selectedCategory);
  }, [data.projects, selectedCategory]);

  return (
    <SectionContainer id={data.id} ariaLabel="Selected Work">
      <SectionHeading title={data.heading} intro={data.intro} />

      {/* Interactive Filter Tabs */}
      {categories.length > 2 && (
        <ScrollReveal gaze="up" delay={0.06} className="mb-9 sm:mb-10">
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap items-center gap-1.5 rounded-xl border border-[#2F3137] bg-[#222327] p-1.5"
          >
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'min-h-[38px] rounded-lg px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B8CA] whitespace-nowrap shrink-0 cursor-pointer sm:text-sm',
                    isSelected
                      ? 'bg-[#A6B8CA] text-[#16171A] shadow-sm'
                      : 'text-[#9CA3AF] hover:bg-[#2A2C31] hover:text-[#F3F4F6]'
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </ScrollReveal>
      )}

      {/* 2-Column Project Showcase Grid */}
      <StaggerContainer
        key={selectedCategory}
        staggerDelay={0.07}
        className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2"
      >
        {filteredProjects.map((project) => (
          <StaggerItem key={project.id} style="scale-up">
            <article className="group flex flex-col">
              <button
                type="button"
                onClick={() => setActiveProject(project)}
                className="text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A6B8CA] cursor-pointer"
              >
                {/* Project Thumbnail Container */}
                <div className="relative overflow-hidden rounded-xl border border-[#2F3137] bg-[#222327] transition-colors duration-200 group-hover:border-[#A6B8CA]/60">
                  <ResponsiveImage
                    src={project.imageSrc}
                    alt={project.imageAlt}
                    fallbackTitle={project.title}
                    className="aspect-[16/10] w-full"
                    imgClassName="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Multi-image indicator badge */}
                  {project.images && project.images.length > 1 && (
                    <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-xs font-mono font-medium text-white/90 backdrop-blur-md shadow-sm">
                      <Images className="h-3 w-3 text-[#A6B8CA]" aria-hidden="true" />
                      <span>{project.images.length}</span>
                    </div>
                  )}
                </div>

                {/* Card Title + Unboxed Tech Metadata */}
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold tracking-tight text-[#F3F4F6] uppercase transition-colors duration-200 group-hover:text-[#A6B8CA] sm:text-xl">
                      {project.title}
                    </h3>

                    <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-medium tracking-wider text-[#9CA3AF] uppercase">
                      {project.techStack.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          <span>{tech}</span>
                          {idx < project.techStack.length - 1 && (
                            <span aria-hidden="true" className="text-[#4B5563]">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2F3137] text-[#9CA3AF] transition-colors duration-200 group-hover:border-[#A6B8CA]/60 group-hover:text-[#A6B8CA]"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[#9CA3AF]">
                  {project.summary}
                </p>
              </button>
            </article>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Fullscreen Case Study Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </SectionContainer>
  );
};
