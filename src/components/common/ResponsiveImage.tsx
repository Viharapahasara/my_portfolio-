import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  /** Optional fallback title displayed if the image fails to load */
  fallbackTitle?: string;
  /** Load immediately without lazy deferral (recommended for above-the-fold hero imagery) */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}

/**
 * Resilient image component with built-in fallback container so an asset
 * issue never results in a raw broken browser image frame.
 */
export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  fallbackTitle,
  priority = false,
  className,
  imgClassName,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          'flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#23252A] via-[#1E2025] to-[#2A313D] p-6 text-center',
          className
        )}
      >
        <ImageOff className="h-6 w-6 text-[#A6B8CA]/70" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide text-[#9CA3AF]">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onError={() => setHasError(true)}
        style={{ objectFit: 'contain' }}
        className={cn('h-full w-full bg-[#1B1B1D] select-none', imgClassName)}
      />
    </div>
  );
};
