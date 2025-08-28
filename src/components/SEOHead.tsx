import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Saher Flow Solutions | Leading Multiphase Flow Measurement Technology | Saudi Arabia",
  description = "Revolutionary DMOR technology for accurate multiphase flow measurement. Non-radioactive, AI-powered flow meters for oil & gas industry. Made in Saudi Arabia, trusted globally.",
  keywords = "multiphase flow meter, DMOR technology, oil gas measurement, Saudi Arabia, non-radioactive flow meter, water cut meter, artificial intelligence, digital twin, flow measurement, petroleum engineering, upstream oil gas, production optimization, Saudi Aramco approved, Vision 2030, made in KSA",
  image = "https://saherflow.com/og-image.jpg",
  url = "https://saherflow.com/",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Saher Flow Solutions",
  section,
  tags = [],
  noindex = false,
  canonical,
  structuredData
}) => {
  const fullTitle = title.includes('Saher Flow') ? title : `${title} | Saher Flow Solutions`;
  const fullUrl = url.startsWith('http') ? url : `https://saherflow.com${url}`;
  const canonicalUrl = canonical || fullUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Saher Flow Solutions" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@SaherFlow" />
      <meta property="twitter:site" content="@SaherFlow" />
      
      {/* LinkedIn */}
      <meta property="linkedin:owner" content="Saher Flow Solutions" />
      
      {/* Additional SEO */}
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="SA-14" />
      <meta name="geo.placename" content="Thuwal, Saudi Arabia" />
      <meta name="geo.position" content="22.308683;39.104413" />
      <meta name="ICBM" content="22.308683, 39.104413" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* FAQ Structured Data for Contact Page */}
      {url === '/contact' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How many different types of multiphase flow meters (MPFM) exist in the market?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Multiple technologies are combined in unique ways to detect the physical properties of a multiphase mixture. By analyzing differences in dielectric constant, density, and spectroscopic response, the proportions of oil, water, and gas can be distinguished."
                }
              },
              {
                "@type": "Question", 
                "name": "Which multiphase sensing technology is widely used in oil and gas upstream industry?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The most established technology for multiphase sensing relies on gamma radiation, with an estimated 90% of existing MPFMs incorporating it in some form."
                }
              },
              {
                "@type": "Question",
                "name": "What are the common shortcomings of gamma based multiphase flow meters?",
                "acceptedAnswer": {
                  "@type": "Answer", 
                  "text": "Although gamma radiation is the most established technology for multiphase sensing, it poses significant safety risks. The radiation emitted from gamma sources is uncontrollable and, upon exposure, can cause irreversible damage to living cells. Due to these hazards, gamma sources are subject to stringent regulations throughout their lifecycle—from procurement to disposal. Consequently, the total cost of ownership of gamma-based MPFMs is estimated to be at least 40% higher than that of non-gamma alternatives."
                }
              },
              {
                "@type": "Question",
                "name": "What are the existing non-gamma technologies, being used in multiphase flow meters?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Achieving reliable multiphase measurements without using gamma radiation is highly desirable, both for enhanced safety and lower total cost of ownership. Currently, several alternative technologies—including capacitance, conductance, microwave resonance and transmission, signal cross-correlation, IR spectroscopy, ultrasonics, and low/high-frequency magnetics—are employed to perform non-gamma multiphase measurements."
                }
              },
              {
                "@type": "Question",
                "name": "What are the challenges in existing non-gamma multiphase technologies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Non-gamma multiphase measurement has been an active area of research for several decades. However, several challenges have slowed the commercial adoption of these technologies. Key obstacles include non-linear and non-monotonic dielectric responses measured by both low-frequency (capacitance and conductance) and high-frequency (microwave) sensors. Additionally, IR spectroscopy is an intrusive sensing method, while ultrasonic techniques suffer from extreme signal dispersion in multiphase (liquid/gas) conditions."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Saher's MPFM technology unique?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Saher's multiphase technology eliminates the use of chemical radiation, such as gamma rays. Instead, we employ a patented microwave DMOR design to measure the dielectric properties of multiphase mixtures at microwave frequencies. To address the challenge of non-linear and non-monotonic inverse measurements, Saher has developed a proprietary digital twin AI model that predicts complex multiphase behavior. This AI-driven model trains Saher's flow computer with minimal reliance on flow-loop calibration and is fully parametrized for water-liquid ratio (WLR), gas volume fraction (GVF), brine salinity, fluid temperature, and pressure. By integrating raw dielectric measurements with the insights from the digital twin AI, Saher's MPFM delivers highly reliable, real-time multiphase measurements."
                }
              },
              {
                "@type": "Question",
                "name": "Does Saher MPFM require calibration?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Like any sensor, Saher's MPFM requires on-field calibration. However, its digital twin AI model already accounts for most process variables that could impact performance. By feeding field data into the Saher flow computer, operators can obtain accurate multiphase measurements under any field conditions."
                }
              }
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;