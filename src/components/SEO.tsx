const SITE_URL = import.meta.env.SITE_URL || import.meta.env.VITE_SITE_URL || "https://www.techhilfepro.de";

type Props = {
  title: string; 
  description: string; 
  path: string;
  robots?: string; 
  ogImage?: string; 
  ogType?: "website"|"article"; 
  lang?: "de";
};

export default function SEO({ title, description, path, robots, ogImage="/og/default.jpg", ogType="website", lang="de" }: Props) {
  const base = SITE_URL.replace(/\/$/, "");
  const url = `${base}${path}`;
  const img = ogImage.startsWith("http") ? ogImage : `${base}${ogImage}`;
  
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {robots && <meta name="robots" content={robots} />}
      <link rel="canonical" href={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content={lang==="de"?"de_DE":"en_US"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <link rel="icon" type="image/svg+xml" href="/brand/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png" />
      <meta name="theme-color" content="#111827" />
    </>
  );
}