import { portfolioData } from './data/portfolioData';
import { ScrollProgressBar } from './components/common/ScrollReveal';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { SectionRenderer } from './components/sections/SectionRenderer';

/**
 * Root Application Shell.
 * All portfolio content, navigation links, images, and section ordering
 * are sourced cleanly from `src/data/portfolioData.ts`.
 */
export default function App() {
  return (
    <div className="min-h-screen bg-[#1B1B1D] text-[#F3F4F6]">
      <ScrollProgressBar />

      <Navbar
        brand={portfolioData.brand}
        navigation={portfolioData.navigation}
        primaryLink={portfolioData.primaryHeaderLink}
      />

      <main>
        <SectionRenderer config={portfolioData} />
      </main>

      <Footer
        brand={portfolioData.brand}
        socialLinks={portfolioData.socialLinks}
      />
    </div>
  );
}
