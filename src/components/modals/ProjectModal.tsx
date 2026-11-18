import React, { useEffect } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProjectItem } from '../../types/portfolio';
import { ProjectImageCarousel } from '../common/ProjectImageCarousel';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

/**
 * Accessible project case study dialog opened when clicking any work card.
 * Supports ESC key closing, backdrop dismiss, and body scroll locking.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
}) => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Dialog Panel */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#2F3137] bg-[#1F2024] shadow-2xl"
          >
            {/* Sticky Modal Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#2F3137] bg-[#1F2024]/95 px-6 py-4 backdrop-blur-md">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF]">
                  <span>{project.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="truncate">{project.role}</span>
                </div>
                <h3
                  id="project-modal-title"
                  className="font-display mt-1 truncate text-xl font-bold text-[#F3F4F6] sm:text-2xl"
                >
                  {project.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close project details"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#2F3137] bg-[#232428] text-[#D1D5DB] transition-colors hover:border-[#A6B8CA]/50 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B8CA] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <ProjectImageCarousel
                images={
                  project.images && project.images.length > 0
                    ? project.images
                    : [project.imageSrc]
                }
                title={project.title}
              />

              <div className="mt-7 space-y-6">
                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-[#A6B8CA] uppercase">
                    Overview
                  </h4>
                  <p className="mt-2.5 text-base leading-relaxed text-[#D1D5DB]">
                    {project.description}
                  </p>
                </div>

                {project.highlights.length > 0 && (
                  <div className="border-t border-[#2F3137] pt-6">
                    <h4 className="text-xs font-semibold tracking-wider text-[#A6B8CA] uppercase">
                      Key Engineering Highlights
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-3 text-sm leading-relaxed text-[#D1D5DB]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#A6B8CA]"
                          />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border-t border-[#2F3137] pt-6">
                  <h4 className="text-xs font-semibold tracking-wider text-[#A6B8CA] uppercase">
                    Technology Stack
                  </h4>
                  {/* Clean unboxed typographic metadata (no pill badges) */}
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium tracking-wider text-[#E5E7EB]">
                    {project.techStack.map((tech, idx) => (
                      <React.Fragment key={tech}>
                        <span>{tech}</span>
                        {idx < project.techStack.length - 1 && (
                          <span aria-hidden="true" className="text-[#6B7280]">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                {(project.liveUrl || project.repoUrl) && (
                  <div className="flex flex-wrap items-center gap-4 border-t border-[#2F3137] pt-6">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#A6B8CA] px-5 py-2.5 text-sm font-semibold text-[#16171A] transition-colors hover:bg-[#C2D2E2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B8CA] whitespace-nowrap shrink-0"
                      >
                        <span>Live Preview</span>
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#383B42] bg-[#232428] px-5 py-2.5 text-sm font-semibold text-[#F3F4F6] transition-colors hover:border-[#A6B8CA]/60 hover:text-[#A6B8CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B8CA] whitespace-nowrap shrink-0"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
