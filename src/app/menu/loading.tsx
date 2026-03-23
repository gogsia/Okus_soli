export default function MenuLoading() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="h-3 w-32 mx-auto mb-4 rounded-full animate-pulse bg-earth" />
          <div className="h-12 w-64 mx-auto mb-6 rounded-lg animate-pulse bg-earth" />
          <div className="h-4 w-80 mx-auto rounded-full animate-pulse bg-earth" />
        </div>

        {/* Tab skeleton */}
        <div className="flex justify-center gap-4 mb-12">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 rounded-full animate-pulse bg-earth"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        {/* Card grid skeleton */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden animate-pulse bg-card"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="aspect-square bg-earth" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-3/4 rounded-full bg-earth" />
                <div className="h-3 w-full rounded-full bg-earth" style={{ opacity: 0.5 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
