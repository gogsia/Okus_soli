import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <span
          aria-hidden="true"
          className="block text-8xl mb-4 font-display text-earth"
        >
          404
        </span>
        <h1
          className="text-3xl md:text-4xl mb-4 font-display"
        >
          This page wandered off
        </h1>
        <p
          className="text-lg mb-8 font-serif italic text-secondary"
        >
          Like a loaf left to proof too long — it&apos;s gone somewhere we didn&apos;t expect.
          Let&apos;s get you back to familiar ground.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="px-8 py-3 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-[1.02] bg-sun text-depth font-sans font-medium"
          >
            Back Home
          </Link>
          <Link
            href="/menu"
            className="px-8 py-3 rounded-full text-sm uppercase tracking-[0.12em] transition-all duration-300 hover:scale-[1.02] border-[1.5px] border-hearth text-hearth font-sans"
          >
            See the Menu
          </Link>
        </div>
      </div>
    </main>
  );
}
