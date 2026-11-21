import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  siteUrl?: string;
  image?: string;
}

export function SEO({
  title = "Vihara Pahasara | Web & Mobile App Designer & Developer",
  description = "Vihara Pahasara is a Web & Mobile App Designer and Developer specializing in Flutter mobile apps, modern UI/UX design, and AI web solutions.",
  keywords = "Vihara Pahasara, vihara pahasara app design, vihara app design, vihara pahasara, app design, mobile app designer, flutter app developer, UI UX designer Sri Lanka, web and mobile app developer",
  author = "Vihara Pahasara",
  siteUrl = "https://viharapahasara.xyz/",
  image = "/favicon.png",
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Vihara Pahasara",
    "alternateName": [
      "vihara pahasara app design",
      "Vihara Pahasara",
      "Viharapahasara"
    ],
    "jobTitle": "Web & Mobile App Designer and Developer",
    "description": description,
    "url": siteUrl,
    "image": image,
    "sameAs": [
      "https://github.com/Viharapahasara",
      "https://www.facebook.com/share/1EnU5ZWgd4/",
      "https://www.instagram.com/pahasarahmvihara?bqrl=MXV3NXpqNHJpMHJxOA=="
    ],
    "knowsAbout": [
      "App Design",
      "Mobile App Design",
      "UI/UX Design",
      "Flutter Development",
      "Web Development",
      "Cross-Platform Mobile Apps",
      "AI Web Development"
    ]
  };

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Canonical Link */}
      <link rel="canonical" href={siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="Vihara Pahasara - App Design & Development" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) for Google SEO */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
