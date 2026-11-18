import React from 'react';
import { cn } from '../../utils/cn';

interface UnderlineActionProps {
  /** Visible action label */
  children: React.ReactNode;
  /** Render as anchor if href is supplied, otherwise button */
  href?: string;
  /** Click handler when rendered as button or link */
  onClick?: (e: React.MouseEvent) => void;
  /** Button type when rendered without href */
  type?: 'button' | 'submit' | 'reset';
  /** Disabled state */
  disabled?: boolean;
  /** Visual variant */
  variant?: 'primary' | 'muted';
  /** Additional class names */
  className?: string;
}

/**
 * Signature underlined CTA control matching the minimalist editorial
 * aesthetic of the reference design ("Contact Me", "SEND MESSAGE").
 */
export const UnderlineAction: React.FC<UnderlineActionProps> = ({
  children,
  href,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className,
}) => {
  const baseStyles = cn(
    'group relative inline-flex min-h-[40px] items-center gap-2 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A6B8CA] whitespace-nowrap shrink-0 cursor-pointer',
    variant === 'primary'
      ? 'text-[#F3F4F6] hover:text-[#A6B8CA]'
      : 'text-[#9CA3AF] hover:text-[#F3F4F6]',
    disabled && 'pointer-events-none opacity-50',
    className
  );

  const underline = (
    <span
      aria-hidden="true"
      className={cn(
        'absolute bottom-1 left-0 h-[2px] w-full origin-left transition-transform duration-200 ease-out group-hover:scale-x-105',
        variant === 'primary' ? 'bg-[#A6B8CA]' : 'bg-[#6B7280] group-hover:bg-[#A6B8CA]'
      )}
    />
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className={baseStyles}>
        <span>{children}</span>
        {underline}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      <span>{children}</span>
      {underline}
    </button>
  );
};
