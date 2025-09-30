import { SITE_URL } from "@/data/seo";

type Props = {
  title: string; 
  description: string; 
  path: string;
  robots?: string; 
  ogImage?: string; 
  ogType?: "website"|"article"; 
  lang?: "de";
  keywords?: string;
  structuredData?: object | object[];
};

export default function SEO({ 
  title, 
  description, 
  path, 
  robots, 
  ogImage="/og/default.jpg", 
  ogType="website", 
  lang="de",
  keywords,
  structuredData
}: Props) {
  const base = SITE_URL.replace(/\/$/, "");
  const url = `${base}${path}`;
  const img = ogImage.startsWith("http") ? ogImage : `${base}${ogImage}`;
  
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content="Tech Hilfe Pro" />
      <meta name="geo.region" content="DE-NW" />
      <meta name="geo.placename" content="Köln, Neuss" />
      <meta name="geo.position" content="50.956;6.957" />
      <meta name="ICBM" content="50.956, 6.957" />
      {robots && <meta name="robots" content={robots} />}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={lang==="de"?"de_DE":"en_US"} />
      <meta property="og:site_name" content="Tech Hilfe Pro" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Tech Hilfe Pro - IT-Service Köln & Neuss" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <meta name="twitter:image:alt" content="Tech Hilfe Pro - IT-Service Köln & Neuss" />
      
      {/* Icons & Theme */}
      <link rel="icon" type="image/svg+xml" href="/brand/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon.png" />
      <meta name="theme-color" content="#f97316" />
      <meta name="msapplication-TileColor" content="#f97316" />
      
      {/* Performance & Loading */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      {structuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])
          }} 
        />
      )}
    </>
  );
}