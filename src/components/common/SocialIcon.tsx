import React from 'react';
import { SocialPlatform } from '../../types/portfolio';
import { Github, Globe, Instagram, Linkedin, Facebook } from 'lucide-react';

interface SocialIconProps {
  platform: SocialPlatform;
  className?: string;
}

/**
 * Maps a social platform identifier from portfolioData.ts to a crisp vector icon.
 */
export const SocialIcon: React.FC<SocialIconProps> = ({
  platform,
  className = 'h-5 w-5',
}) => {
  switch (platform) {
    case 'github':
      return <Github className={className} aria-hidden="true" />;
    case 'linkedin':
      return <Linkedin className={className} aria-hidden="true" />;
    case 'instagram':
      return <Instagram className={className} aria-hidden="true" />;
    case 'facebook':
      return <Facebook className={className} aria-hidden="true" />;
    case 'x':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'globe':
    default:
      return <Globe className={className} aria-hidden="true" />;
  }
};
