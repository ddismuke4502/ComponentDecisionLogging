export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-full bg-(--turquoise)] px-5 py-3 text-sm font-black text-slate-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to main content
    </a>
  );
}