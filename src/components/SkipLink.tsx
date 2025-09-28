export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 bg-white border rounded-xl px-3 py-2 shadow"
    >
      Zum Inhalt springen
    </a>
  );
}