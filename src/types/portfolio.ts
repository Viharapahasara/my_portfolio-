/**
 * ============================================================================
 * PORTFOLIO DATA & COMPONENT TYPES
 * ============================================================================
 * Centralized TypeScript definitions for all portfolio content, navigation,
 * projects, contact configuration, and dynamic section registration.
 * Adding new fields or sections starts here so the entire app stays type-safe.
 */

export type SocialPlatform = 'github' | 'linkedin' | 'instagram' | 'facebook' | 'x' | 'globe';

export interface SocialLink {
  /** Platform key used to render the matching icon */
  platform: SocialPlatform;
  /** Accessible label for screen readers and tooltips */
  label: string;
  /** Destination URL */
  url: string;
}

export interface NavItem {
  /** Display label shown in the top navigation bar and mobile menu */
  label: string;
  /** Target section ID (without `#`) for smooth scrolling */
  sectionId: string;
}

export interface BrandConfig {
  /** Bold leading portion of the wordmark (e.g., "Emad") */
  primaryName: string;
  /** Lighter trailing portion of the wordmark (e.g., "almagedy") */
  secondaryName: string;
  /** Short copyright holder string shown in footer */
  copyrightName: string;
}

export interface HeroData {
  /** Target anchor ID for navigation */
  id: string;
  /** Short conversational greeting above the main headline */
  greeting: string;
  /** Primary display headline (renders in steel-blue accent) */
  roleTitle: string;
  /** Optional concise supporting sentence below the role title */
  tagline?: string;
  /** Primary underlined CTA label */
  primaryCtaLabel: string;
  /** Target section ID for the primary CTA */
  primaryCtaTarget: string;
  /** Secondary subtle link label (e.g., "View Selected Work") */
  secondaryCtaLabel?: string;
  /** Target section ID for the secondary CTA */
  secondaryCtaTarget?: string;
  /** Portrait image URL or imported asset */
  portraitSrc: string;
  /** Descriptive alt text for portrait accessibility */
  portraitAlt: string;
}

export interface SkillMetricItem {
  /** Unique identifier */
  id: string;
  /** Discipline or technology title (e.g., "Front-End") */
  title: string;
  /** Experience metric displayed with clean underline (e.g., "60+ Hours Experience") */
  experience: string;
  /** Optional short summary shown beneath or on hover */
  detail?: string;
}

export interface AboutData {
  /** Target anchor ID */
  id: string;
  /** Section heading text (e.g., "about") */
  heading: string;
  /** One or more bio paragraphs */
  paragraphs: string[];
  /** Core discipline/experience columns */
  skills: SkillMetricItem[];
}

export interface ProjectItem {
  /** Unique project slug/ID */
  id: string;
  /** Project display title */
  title: string;
  /** Category used by the interactive filter tabs */
  category: string;
  /** Short year or release timeframe */
  year: string;
  /** Client or project context */
  role: string;
  /** Short summary shown in cards and modal */
  summary: string;
  /** Detailed description shown inside the project modal */
  description: string;
  /** Key technical highlights or deliverables */
  highlights: string[];
  /** Tech stack list rendered as clean unboxed uppercase metadata */
  techStack: string[];
  /** Project preview image URL or imported asset */
  imageSrc: string;
  /** Accessible alt text for the preview image */
  imageAlt: string;
  /** Optional array of image URLs or assets for swipeable multi-image preview */
  images?: string[];
  /** Optional live deployment link */
  liveUrl?: string;
  /** Optional source repository link */
  repoUrl?: string;
}

export interface WorkData {
  /** Target anchor ID */
  id: string;
  /** Section heading text (e.g., "work") */
  heading: string;
  /** Introductory paragraph above the project grid */
  intro: string;
  /** List of portfolio projects */
  projects: ProjectItem[];
}

export interface ContactData {
  /** Target anchor ID */
  id: string;
  /** Section heading text (e.g., "Contact Me") */
  heading: string;
  /** Short invitation copy below the heading */
  intro: string;
  /** Direct email address used for copy-to-clipboard & mailto fallback */
  email: string;
  /** WhatsApp phone number in international format without + or spaces (e.g., "94771234567") */
  whatsappNumber: string;
  /** Physical timezone / location context */
  location: string;
  /** Typical response window */
  responseTime: string;
  /** Current project availability statement */
  availability: string;
  /** Selectable inquiry categories (kept optional for backward compatibility) */
  inquiryTypes?: string[];
  /** Selectable project scope / timeline options (kept optional for backward compatibility) */
  timelines?: string[];
  /** Submit button label */
  submitLabel: string;
}

/**
 * Reusable structure for adding new custom sections purely via data/portfolioData.ts.
 * Supports multi-column cards (e.g., Services, Experience Timeline, Certifications, Testimonials).
 */
export interface CustomSectionCard {
  id: string;
  /** Optional small index or timeframe (e.g., "01", "2024 — Present") */
  meta?: string;
  /** Card heading */
  title: string;
  /** Secondary subtitle (e.g., company name or client role) */
  subtitle?: string;
  /** Descriptive body text */
  description: string;
  /** Optional unboxed footer notes (e.g., tools or deliverables) */
  highlights?: string[];
}

export interface CustomSectionData {
  /** Unique anchor ID (must match NavItem.sectionId if linked in navbar) */
  id: string;
  /** Section heading matching the signature heading + line motif */
  heading: string;
  /** Optional introductory paragraph */
  intro?: string;
  /** Grid column count on desktop */
  columns?: 2 | 3;
  /** Cards rendered inside this custom section */
  items: CustomSectionCard[];
}

/**
 * Section Registry Entry:
 * Controls which sections appear on the page and in what exact order.
 * Set `enabled: false` to hide a section without deleting its data,
 * or add a new `{ type: 'custom', ... }` entry to expand the site effortlessly.
 */
export type PageSectionConfig =
  | { key: string; type: 'hero'; enabled: boolean }
  | { key: string; type: 'about'; enabled: boolean }
  | { key: string; type: 'work'; enabled: boolean }
  | { key: string; type: 'contact'; enabled: boolean }
  | { key: string; type: 'custom'; enabled: boolean; data: CustomSectionData };

export interface PortfolioConfig {
  brand: BrandConfig;
  navigation: NavItem[];
  primaryHeaderLink: SocialLink;
  socialLinks: SocialLink[];
  hero: HeroData;
  about: AboutData;
  work: WorkData;
  contact: ContactData;
  /** Ordered list of sections rendered by <SectionRenderer /> */
  sections: PageSectionConfig[];
}
