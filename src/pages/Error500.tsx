import SEO from "../components/SEO";

export default function Error500() {
  const meta = { title:"Fehler | Tech Hilfe Pro", description:"Ein Fehler ist aufgetreten.", path:"/error" };
  
  return (
    <>
      <SEO title={meta.title} description={meta.description} path={meta.path} robots="noindex,nofollow" />
      <section className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-3">Unerwarteter Fehler</h1>
        <p className="mb-6">Bitte versuchen Sie es erneut oder gehen Sie zur Startseite.</p>
        <a className="text-thp-primary underline hover:opacity-80" href="/">Zur Startseite</a>
      </section>
    </>
  );
}