export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center">
        {/* Animated wheat stalk */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          className="mx-auto mb-4 animate-pulse text-hearth"
          aria-label="Učitavanje"
        >
          <path d="M12 48V24" />
          <path d="M12 24c-3-2-5-6-5-10 5 1 7 5 5 10z" />
          <path d="M12 24c3-2 5-6 5-10-5 1-7 5-5 10z" />
          <path d="M12 18c-2-2-4-5-4-8 4 1 6 4 4 8z" />
          <path d="M12 18c2-2 4-5 4-8-4 1-6 4-4 8z" />
        </svg>
        <p
          className="text-sm uppercase tracking-[0.15em] text-secondary font-sans"
        >
          Pripremamo...
        </p>
      </div>
    </div>
  );
}
