import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BrandConfig, SocialLink } from '../../types/portfolio';
import { SocialIcon } from '../common/SocialIcon';

interface FooterProps {
  brand: BrandConfig;
  socialLinks: SocialLink[];
}

/**
 * Clean editorial footer matching the reference bottom bar:
 * Brand wordmark + quiet copyright on the left, back-to-top + social icons on the right.
 */
export const Footer: React.FC<FooterProps> = ({ brand, socialLinks }) => {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#2F3137] bg-[#1B1B1D]">
      <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8 lg:px-10">
        {/* Left: Wordmark & Quiet Copyright */}
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="font-display text-lg tracking-tight text-[#F3F4F6]">
            <span className="font-extrabold">{brand.primaryName}</span>
            <span className="font-normal text-[#E5E7EB]/90">{brand.secondaryName}</span>
          </span>
          <span className="text-xs text-[#9CA3AF]">
            &copy; {currentYear} {brand.copyrightName}. All rights reserved.
          </span>
        </div>

        {/* Right: Back-to-top & Social Icons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBackToTop}
            aria-label="Scroll back to top"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-[#9CA3AF] transition-colors hover:bg-[#232428] hover:text-[#F3F4F6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B8CA] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

          <span aria-hidden="true" className="h-4 w-[1px] bg-[#2F3137]" />

          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#F3F4F6] transition-colors duration-200 hover:bg-[#232428] hover:text-[#A6B8CA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6B8CA]"
              >
                <SocialIcon platform={social.platform} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
