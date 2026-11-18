import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  Images,
  Maximize2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ResponsiveImage } from './ResponsiveImage';
import { cn } from '../../utils/cn';

interface ProjectImageCarouselProps {
  /** Array of image URLs or imported image assets */
  images: string[];
  /** Alt text / project title for accessibility */
  title: string;
  className?: string;
}

/**
 * Interactive touch-swipeable & keyboard-navigable image carousel for project showcases.
 * Supports:
 * - Touch swipe (mobile gestures)
 * - Mouse drag / swipe
 * - Next & Previous buttons
 * - Indicator dots & counter badge
 * - Thumbnail navigation strip
 * - Keyboard Left / Right arrow navigation
 * - True Fullscreen Lightbox rendered via React Portal directly into document.body
 */
export const ProjectImageCarousel: React.FC<ProjectImageCarouselProps> = ({
  images,
  title,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const safeImages = images.length > 0 ? images : [''];
  const total = safeImages.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Swipe detection via touch coordinates
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isSwipingRef = useRef<boolean>(false);

  // Reset index if images change
  useEffect(() => {
    setCurrentIndex(0);
    setDirection(0);
  }, [images]);

  // Lock body scroll when in fullscreen lightbox
  useEffect(() => {
    if (!isFullscreen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isFullscreen]);

  const goToNext = useCallback(() => {
    if (total <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrev = useCallback(() => {
    if (total <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToIndex = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev, isFullscreen]);

  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isSwipingRef.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwipingRef.current || touchStartXRef.current === null || touchStartYRef.current === null) {
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const diffX = touchEndX - touchStartXRef.current;
    const diffY = touchEndY - touchStartYRef.current;

    // Trigger swipe if horizontal displacement is greater than 40px and dominant over vertical
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
    isSwipingRef.current = false;
  };

  // Motion animation variants for sliding
  const slideVariants = {
    enter: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir > 0 ? '100%' : '-100%',
      opacity: prefersReducedMotion ? 1 : 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: prefersReducedMotion ? 0 : dir < 0 ? '100%' : '-100%',
      opacity: prefersReducedMotion ? 1 : 0,
    }),
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Main Image Slider Viewport (Inside Modal) */}
      <div
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#2F3137] bg-[#1A1B1E] select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 320, damping: 32 },
              opacity: { duration: 0.2 },
            }}
            drag={total > 1 ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                goToNext();
              } else if (info.offset.x > swipeThreshold) {
                goToPrev();
              }
            }}
            className="absolute inset-0 h-full w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <ResponsiveImage
              src={safeImages[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1} of ${total}`}
              fallbackTitle={title}
              priority
              className="h-full w-full"
              imgClassName="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top Badges: Multi-image counter & Fullscreen toggle */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          {total > 1 ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs font-mono font-medium text-white/90 backdrop-blur-md shadow-sm">
              <Images className="h-3.5 w-3.5 text-[#A6B8CA]" aria-hidden="true" />
              <span>
                {currentIndex + 1} / {total}
              </span>
            </div>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            aria-label="View Fullscreen"
            title="View Fullscreen"
            className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/60 text-white/80 backdrop-blur-md transition-all hover:bg-black/90 hover:text-white hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#A6B8CA] cursor-pointer"
          >
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Previous & Next Navigation Buttons */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/90 backdrop-blur-md transition-all hover:scale-105 hover:border-[#A6B8CA]/60 hover:bg-[#A6B8CA] hover:text-[#16171A] focus-visible:outline-2 focus-visible:outline-[#A6B8CA] cursor-pointer opacity-90 sm:opacity-80 sm:group-hover:opacity-100 shadow-md"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/90 backdrop-blur-md transition-all hover:scale-105 hover:border-[#A6B8CA]/60 hover:bg-[#A6B8CA] hover:text-[#16171A] focus-visible:outline-2 focus-visible:outline-[#A6B8CA] cursor-pointer opacity-90 sm:opacity-80 sm:group-hover:opacity-100 shadow-md"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {total > 1 && (
          <div className="absolute bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5 pointer-events-none">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 backdrop-blur-md pointer-events-auto">
              {safeImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-1 focus-visible:outline-[#A6B8CA]',
                    idx === currentIndex
                      ? 'w-5 bg-[#A6B8CA]'
                      : 'w-1.5 bg-white/40 hover:bg-white/70'
                  )}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Thumbnails Row */}
      {total > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
          {safeImages.map((imgSrc, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToIndex(idx)}
                aria-label={`View image ${idx + 1}`}
                aria-current={isSelected}
                className={cn(
                  'relative aspect-[16/10] h-14 sm:h-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#A6B8CA]',
                  isSelected
                    ? 'border-[#A6B8CA] ring-2 ring-[#A6B8CA]/30 shadow-md opacity-100 scale-[1.02]'
                    : 'border-[#2F3137] opacity-55 hover:opacity-100 hover:border-[#4B5563]'
                )}
              >
                <img
                  src={imgSrc}
                  alt={`${title} thumbnail ${idx + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                {isSelected && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[#A6B8CA]/10 pointer-events-none"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* ==================================================================== */}
      {/* TRUE FULLSCREEN LIGHTBOX (Rendered in document.body via React Portal) */}
      {/* ==================================================================== */}
      {isFullscreen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${title} Fullscreen Lightbox`}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-black/95 p-4 sm:p-6 backdrop-blur-lg select-none"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Fullscreen Top Header */}
            <div className="flex w-full items-center justify-between px-2 py-2 text-white">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm font-semibold tracking-wide text-[#F3F4F6] sm:text-base line-clamp-1">
                  {title}
                </span>
                {total > 1 && (
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 font-mono text-xs text-[#A6B8CA]">
                    {currentIndex + 1} / {total}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                aria-label="Close Fullscreen"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-105 focus-visible:outline-2 focus-visible:outline-[#A6B8CA] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Fullscreen Image Center Viewport */}
            <div className="relative flex flex-1 w-full items-center justify-center overflow-hidden my-2">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 320, damping: 32 },
                    opacity: { duration: 0.2 },
                  }}
                  drag={total > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.25}
                  onDragEnd={(_, info) => {
                    const swipeThreshold = 50;
                    if (info.offset.x < -swipeThreshold) {
                      goToNext();
                    } else if (info.offset.x > swipeThreshold) {
                      goToPrev();
                    }
                  }}
                  className="flex h-full w-full items-center justify-center cursor-grab active:cursor-grabbing p-2"
                >
                  <img
                    src={safeImages[currentIndex]}
                    alt={`${title} - Image ${currentIndex + 1} of ${total}`}
                    className="max-h-[82vh] max-w-[92vw] rounded-xl object-contain shadow-2xl"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Fullscreen Previous & Next Arrow Buttons */}
              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrev();
                    }}
                    aria-label="Previous image"
                    className="absolute left-2 sm:left-6 top-1/2 z-20 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-[#A6B8CA] hover:text-[#16171A] focus-visible:outline-2 focus-visible:outline-[#A6B8CA] cursor-pointer shadow-lg"
                  >
                    <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    aria-label="Next image"
                    className="absolute right-2 sm:right-6 top-1/2 z-20 -translate-y-1/2 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-[#A6B8CA] hover:text-[#16171A] focus-visible:outline-2 focus-visible:outline-[#A6B8CA] cursor-pointer shadow-lg"
                  >
                    <ChevronRight className="h-6 w-6" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>

            {/* Fullscreen Bottom Thumbnails / Dots Bar */}
            {total > 1 && (
              <div className="flex w-full items-center justify-center gap-2 overflow-x-auto py-2">
                {safeImages.map((imgSrc, idx) => {
                  const isSelected = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToIndex(idx)}
                      aria-label={`Jump to image ${idx + 1}`}
                      className={cn(
                        'relative h-12 w-20 shrink-0 overflow-hidden rounded-md border transition-all cursor-pointer',
                        isSelected
                          ? 'border-[#A6B8CA] ring-2 ring-[#A6B8CA]/60 scale-105 opacity-100'
                          : 'border-white/20 opacity-40 hover:opacity-90'
                      )}
                    >
                      <img
                        src={imgSrc}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};
