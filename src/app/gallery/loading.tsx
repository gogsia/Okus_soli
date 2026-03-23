export default function GalleryLoading() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="h-3 w-40 mx-auto mb-4 rounded-full animate-pulse bg-earth" />
          <div className="h-12 w-56 mx-auto mb-6 rounded-lg animate-pulse bg-earth" />
        </div>

        <div className="flex justify-center gap-6 mb-12">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-6 w-20 rounded-full animate-pulse bg-earth"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-4/3 rounded-xl animate-pulse bg-earth"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
