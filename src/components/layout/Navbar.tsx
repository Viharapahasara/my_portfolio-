import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { BrandConfig, NavItem, SocialLink } from '../../types/portfolio';
import { SocialIcon } from '../common/SocialIcon';
import { cn } from '../../utils/cn';

interface NavbarProps {
  brand: BrandConfig;
  navigation: NavItem[];
  primaryLink: SocialLink;
}

/**
 * Sticky single-row responsive header following a strict three-zone layout:
 * 1. Brand Wordmark
 * 2. Concise single-line navigation links (with active section highlighting)
 * 3. Primary external action (GitHub) + mobile menu toggle on small viewports
 */
export const Navbar: React.FC<NavbarProps> = ({
  brand,
  navigation,
  primaryLink,
}) => {
  const [activeSection, setActiveSection] = useState<string>(
    navigation[0]?.sectionId ?? 'home'
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Track subtle backdrop border visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section cleanly via IntersectionObserver
  useEffect(() => {
    const sectionIds = navigation.map((item) => item.sectionId);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navigation]);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-200',
        isScrolled
          ? 'border-b border-[#2F3137]/80 bg-[#1B1B1D]/90 backdrop-blur-md'
          : 'border-b border-transparent bg-[#1B1B1D]/75 backdrop-blur-sm'
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-8 px-5 sm:h-20 sm:px-8 lg:px-10">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href={`#${navigation[0]?.sectionId ?? 'home'}`}
          onClick={(e) => {
            e.preventDefault();
            scrollToSection(navigation[0]?.sectionId ?? 'home');
          }}
          className="font-display whitespace-nowrap shrink-0 text-lg tracking-tight text-[#F3F4F6] transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A6B8CA] sm:text-xl"
        >
          <span className="font-extrabold">{brand.primaryName}</span>
          <span className="font-normal text-[#E5E7EB]/90">{brand.secondaryName}</span>
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navigation.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.sectionId);
                }}
                className={cn(
                  'relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A6B8CA]',
                  isActive
                    ? 'text-[#F3F4F6]'
                    : 'text-[#9CA3AF] hover:text-[#F3F4F6]'
                )}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0.5 left-0 h-[2px] w-full rounded-full bg-[#A6B8CA]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={primaryLink.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={primaryLink.label}
            title={primaryLink.label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#F3F4F6] transition-colors duration-200 hover:bg-[#2A2C31] hover:text-[#A6B8CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B8CA]"
          >
            <SocialIcon platform={primaryLink.platform} className="h-6 w-6" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-[#F3F4F6] transition-colors hover:bg-[#2A2C31] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B8CA] md:hidden cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            id="mobile-nav-drawer"
            aria-label="Mobile Navigation"
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-[#2F3137] bg-[#1B1B1D] px-5 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <li key={item.sectionId}>
                    <a
                      href={`#${item.sectionId}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.sectionId);
                      }}
                      className={cn(
                        'flex min-h-[44px] items-center justify-between rounded-lg px-3 text-base font-medium transition-colors',
                        isActive
                          ? 'bg-[#232428] text-[#A6B8CA]'
                          : 'text-[#D1D5DB] hover:bg-[#232428] hover:text-white'
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="text-xs text-[#A6B8CA]">Active</span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
