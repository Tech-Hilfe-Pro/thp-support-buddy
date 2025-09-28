export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] bg-white text-black border rounded px-3 py-2 shadow"
    >
      Zum Inhalt springen
    </a>
  );
}