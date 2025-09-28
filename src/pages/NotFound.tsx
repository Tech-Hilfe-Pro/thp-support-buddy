import SEO from "../components/SEO";

export default function NotFound() {
  const meta = { 
    title: "Seite nicht gefunden | Tech Hilfe Pro", 
    description: "Die angeforderte Seite existiert nicht.", 
    path: "/404" 
  };
  
  return (
    <>
      <SEO 
        title={meta.title} 
        description={meta.description} 
        path={meta.path} 
        robots="noindex,nofollow" 
      />
      <section className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-3">404 – Seite nicht gefunden</h1>
        <p className="mb-6">Die Seite existiert nicht oder wurde verschoben.</p>
        <ul className="list-disc ml-6 space-y-1">
          <li><a className="text-indigo-600 underline" href="/">Startseite</a></li>
          <li><a className="text-indigo-600 underline" href="/leistungen">Leistungen</a></li>
          <li><a className="text-indigo-600 underline" href="/pakete-preise">Pakete & Preise</a></li>
          <li><a className="text-indigo-600 underline" href="/termin">Termin buchen</a></li>
        </ul>
      </section>
    </>
  );
}