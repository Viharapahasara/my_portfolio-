import { PortfolioConfig } from '../types/portfolio';

/**
 * ============================================================================
 * LOCAL GENERATED IMAGE ASSETS
 * ============================================================================
 * Replace these imports with your own images placed in `src/assets/images/`
 * or update the paths whenever you customize your portfolio.
 */
import heroPortraitImg from '../assets/images/Stylized Portrait in Black Shirt.webp';


import macGraMainImg from '../assets/images/Screenshot 2026-11-17 120517.webp';
import macGraProjectImg from '../assets/images/Screenshot 2026-11-17 120537.webp';
import macGraAboutImg from '../assets/images/Screenshot 2026-11-17 120554.webp';
import macGraContactImg from '../assets/images/Screenshot 2026-11-17 120610.webp';

import expenzMainImg from '../assets/images/WhatsApp Image 2026-11-17 at 15.58.59 1.webp';
import expenzChartImg from '../assets/images/WhatsApp Image 2026-11-17 at 15.58.59 2.webp';
import expenzAddExpenseImg from '../assets/images/WhatsApp Image 2026-11-17 at 15.59.00 1.webp';
import expenzSettingsImg from '../assets/images/WhatsApp Image 2026-11-17 at 15.59.00.webp';
import expenzSettingsImg2 from '../assets/images/WhatsApp Image 2026-11-17 at 15.59.02 1.webp';

import expenzSettingsImg4 from '../assets/images/WhatsApp Image 2026-11-17 at 15.59.03 1.webp';
import expenzSettingsImg5 from '../assets/images/WhatsApp Image 2026-11-17 at 15.58.58.webp';

import ecommerceArchImg from '../assets/images/project_ecommerce_arch_1794716531159.jpg';
import devWorkspaceImg from '../assets/images/project_dev_workspace_1794716531350.jpg';

/**
 * ============================================================================
 * CENTRALIZED PORTFOLIO DATA FILE
 * ============================================================================
 * Edit all text, skills, projects, contact details, social links, and section
 * ordering from this single file.
 *
 * HOW TO ADD A NEW SECTION EASILY:
 * 1. Add a new `{ key: 'my-section', type: 'custom', enabled: true, data: { ... } }`
 *    entry inside the `sections` array at the bottom of this file.
 * 2. (Optional) Add a matching `{ label: 'Services', sectionId: 'services' }`
 *    item to `navigation` so it appears in the top navbar automatically.
 * 3. Or, if you need a completely bespoke React section component, register it
 *    inside `src/components/sections/SectionRenderer.tsx`.
 */
export const portfolioData: PortfolioConfig = {
  // --------------------------------------------------------------------------
  // 1. BRANDING & HEADER / FOOTER IDENTITY
  // --------------------------------------------------------------------------
  brand: {
    primaryName: 'Vihara',
    secondaryName: 'Pahasara',
    copyrightName: 'Viharapahasara',
  },

  // --------------------------------------------------------------------------
  // 2. TOP NAVIGATION LINKS (Keep concise: 4–5 items for clean single-row bar)
  // --------------------------------------------------------------------------
  navigation: [
    { label: 'Home', sectionId: 'home' },
    { label: 'About', sectionId: 'about' },
    { label: 'Work', sectionId: 'work' },
    { label: 'Services', sectionId: 'services' },
    { label: 'Contact', sectionId: 'contact' },
  ],

  // Top-right header icon action (matches the GitHub icon in the design)
  primaryHeaderLink: {
    platform: 'github',
    label: 'GitHub Profile',
    url: 'https://github.com/Viharapahasara',
  },

  // Footer social links
  socialLinks: [
    { platform: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/share/1EnU5ZWgd4/' },
    { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/pahasarahmvihara?bqrl=MXV3NXpqNHJpMHJxOA==' },
    { platform: 'github', label: 'GitHub', url: 'https://github.com/Viharapahasara' },
   /* { platform: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com' },*/
  ],

  // --------------------------------------------------------------------------
  // 3. HERO SECTION
  // --------------------------------------------------------------------------
  hero: {
    id: 'home',
    greeting: "Hello, I'm Vihara,",
    roleTitle: 'Web & Mobile App Developer',
    tagline:
      '"Designing and developing powerful mobile applications with seamless user experiences and modern technologies."',
    primaryCtaLabel: 'Contact Me',
    primaryCtaTarget: 'contact',
    secondaryCtaLabel: 'Explore Work',
    secondaryCtaTarget: 'work',
    portraitSrc: heroPortraitImg,
    portraitAlt: 'Stylized portrait of Vihara Pahasara, Web & Mobile App Developer',
  },

  // --------------------------------------------------------------------------
  // 4. ABOUT SECTION
  // --------------------------------------------------------------------------
  about: {
    id: 'about',
    heading: 'about',
    paragraphs: [
      'Passionate Junior Software Developer with hands-on experience in building cross-platform mobile apps using Flutter and Dart, alongside web and automation tools. Strong foundation in computer science fundamentals, self driven learning, and problem-solving.',
    ],
    skills: [
      {
        id: 'frontend',
        title: 'Flutter Development',
        experience: '720+ Hours Experience',
        detail: 'Dart, State Management & Responsive UI',
      },
      {
        id: 'python',
        title: 'AI Web Development',
        experience: '1 Year Experience',
        detail: 'Google Antigravity, Stitch, AI-Driven Development, FastAPI & Rapid Prototyping',
      },
     /* {
        id: 'ml',
        title: 'Machine Learning',
        experience: 'Currently Studying & Building',
        detail: 'Model Evaluation, PyTorch, Scikit-Learn & APIs',
      },*/
      
    ],
  },

  // --------------------------------------------------------------------------
  // 5. WORK / PROJECTS SECTION
  // --------------------------------------------------------------------------
  work: {
    id: 'work',
    heading: 'work',
    intro:
      '"Freelance development projects specializing in cross-platform Flutter mobile apps and web solutions, with upcoming builds expanding into Machine Learning. Select any project to explore the full details."',
    projects: [
      {
        id: 'design-portfolio-system',
        title: 'MacGra Design Portfolio System',
        category: 'UI & Front-End',
        year: '2026',
        role: 'Design & Front-End',
        summary:
          'Modular personal portfolio architecture crafted for fast content updates, fluid scroll choreography, and responsive clarity.',
        description:
          'A clean editorial portfolio system engineered around decoupled data files and reusable UI primitives. Built to maintain crisp typographic contrast across desktop and mobile viewports without visual clutter.',
        highlights: [
          '100% data-driven section and project registry for rapid customization',
          'GPU-composited scroll reveals respecting prefers-reduced-motion',
          'Modular component architecture ready for multi-page scaling',
        ],
        techStack: ['HTML', 'CSS', 'JAVASCRIPT', 'REACT'],
        imageSrc: macGraMainImg,
        imageAlt: 'Design Portfolio web interface showcase',
        // Multiple images list for swipeable carousel modal:
        images: [macGraMainImg, macGraProjectImg, macGraAboutImg, macGraContactImg],
        liveUrl: 'https://macgra.netlify.app/',
        repoUrl: 'https://github.com/Viharapahasara/MagGra',
      },
     {
        id: 'expenz-finance-app',
        title: 'Expenz - Expense Tracker App',
        category: 'Mobile APP',
        year: '2026',
        role: 'Flutter Developer',
        summary:
          'A feature-rich personal finance mobile application built with Flutter for tracking daily incomes, expenses, and budgeting goals.',
        description:
          'Designed to help users effortlessly manage their personal finances with interactive category breakdowns, visual spending charts, and local data persistence. Built with a clean, modern UI to make money management smooth and intuitive.',
        highlights: [
          'Dynamic income and expense tracking with custom categories',
          'Interactive visual charts for monthly and daily spending analysis',
          'Smooth local data storage and state management for offline usage',
        ],
        techStack: ['FLUTTER', 'DART', 'MOBILE'],
        imageSrc: expenzSettingsImg5,
        imageAlt: 'Expenz personal finance mobile application interface',
        // Multiple images list for swipeable carousel modal:
        images: [
          expenzMainImg,
          expenzChartImg,
          expenzAddExpenseImg,
          expenzSettingsImg,
          expenzSettingsImg2,
         
          expenzSettingsImg4,
          expenzSettingsImg5,

        ],
        liveUrl: 'https://github.com/Viharapahasara/expenz-DP-flutter-Course',
        repoUrl: 'https://github.com/Viharapahasara/expenz-DP-flutter-Course',
      },
    /*  {
        id: 'aurum-headless-commerce',
        title: 'Aurum Headless Storefront',
        category: 'Full-Stack',
        year: '2025',
        role: 'Lead Full Stack Developer',
        summary:
          'Minimalist e-commerce storefront featuring instant cart synchronization, multi-step checkout, and edge-cached catalog pages.',
        description:
          'Designed and implemented a fast storefront experience prioritizing editorial product photography, predictable checkout validation, and clean API boundaries for inventory and payments.',
        highlights: [
          'Zero-reload drawer cart with optimistic quantity updates',
          'Accessible multi-step checkout with strict schema validation',
          'Modular product catalog and order webhook microservices',
        ],
        techStack: ['TYPESCRIPT', 'NODE.JS', 'POSTGRESQL', 'TAILWIND'],
        imageSrc: ecommerceArchImg,
        imageAlt: 'Minimalist headless e-commerce storefront UI',
        liveUrl: 'https://example.com/aurum-commerce',
        repoUrl: 'https://github.com',
      },
      {
        id: 'synergy-api-orchestrator',
        title: 'Synergy Cloud Orchestrator',
        category: 'Full-Stack',
        year: '2025',
        role: 'Systems & UI Engineer',
        summary:
          'Developer workspace for monitoring distributed API gateways, deployment pipelines, and structured service logs.',
        description:
          'A unified developer portal consolidating deployment pipelines, request throughput telemetry, and service dependency graphs into a calm, legible dark-mode workspace.',
        highlights: [
          'Real-time service topology mapping and latency diagnostics',
          'Structured JSON log viewer with instant keyword filtering',
          'Role-based environment controls and audit history',
        ],
        techStack: ['PYTHON', 'FASTAPI', 'REACT', 'DOCKER'],
        imageSrc: devWorkspaceImg,
        imageAlt: 'Cloud API orchestration developer dashboard',
        liveUrl: 'https://example.com/synergy-cloud',
        repoUrl: 'https://github.com/Viharapahasara',
      },*/
    ],
  },

  // --------------------------------------------------------------------------
  // 6. CONTACT SECTION (Direct WhatsApp Messaging + Email Info)
  // --------------------------------------------------------------------------
  contact: {
    id: 'contact',
    heading: 'Contact Me',
    intro:
      'Have a project or question in mind? Write your message below and send it straight to my WhatsApp.',
    email: 'hmviharapahasara@gmail.com',
    // Replace with your WhatsApp number in international format without "+" or spaces (e.g. "94771234567")
    whatsappNumber: '94781602996',
    location: 'Remote · Worldwide (UTC+3 / Flexible Overlap)',
    responseTime: 'Typically responds within 24 hours',
    availability: 'Open for freelance & part-time app Development role',
    submitLabel: 'SEND TO WHATSAPP',
  },

  // --------------------------------------------------------------------------
  // 7. MODULAR SECTION REGISTRY
  // Reorder, disable (`enabled: false`), or append new `custom` sections here!
  // --------------------------------------------------------------------------
  sections: [
    { key: 'hero-section', type: 'hero', enabled: true },
    { key: 'about-section', type: 'about', enabled: true },
    { key: 'work-section', type: 'work', enabled: true },

    // Example Custom Section (already wired & easy to edit or duplicate!)
    {
      key: 'services-section',
      type: 'custom',
      enabled: true,
      data: {
        id: 'services',
        heading: 'services',
        intro:
          'Focused engineering capabilities structured to take ideas from early technical discovery to resilient production delivery.',
        columns: 3,
        items: [
          {
            id: 'srv-01',
            meta: '01',
            title: 'App Development',
            subtitle: 'Cross-Platform Mobile Apps',
            description:
              'Cross-platform mobile applications built with clean architecture, robust state management, responsive UI design, and smooth user experiences.',
            highlights: [' Dart & Flutter Core', 'State Management', 'Responsive UI'],
          },
          {
            id: 'srv-02',
            meta: '02',
            title: 'Web Development',
            subtitle: 'React, Modern UI & Rapid Prototyping',
            description:
              'Modern, responsive web applications and rapid prototypes built using React, accelerated through AI development tools like Google Antigravity and Stitch.',
            highlights: ['React & Modern UI', 'Google Antigravity & Stitch', 'Rapid Prototyping'],
          },
         /* {
            id: 'srv-03',
            meta: '03',
            title: 'Machine Learning',
            subtitle: 'Models & Hands-on Exploration',
            description:
              'Practical machine learning pipelines, model evaluation, and inference workflows built as part of my ongoing study journey in AI.',
            highlights: ['Model Evaluation', 'PyTorch & Scikit-Learn', 'APIs & Integration'],
          },*/
        ],
      },
    },

    { key: 'contact-section', type: 'contact', enabled: true },
  ],
};
