'use client';

import { useRef, useEffect, useState } from 'react';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Placeholder coordinates — replace with actual bakery location
const BAKERY_LNG = 14.4378;
const BAKERY_LAT = 35.8989;

function MapFallback() {
  return (
    <div
      className="relative rounded-2xl overflow-hidden min-h-100 md:min-h-0 h-full flex flex-col items-center justify-center p-8 text-center bg-earth"
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 text-grove">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <p className="text-sm font-serif italic text-bark">
        123 Olive Grove Lane, Mediterranean Quarter
      </p>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${BAKERY_LAT},${BAKERY_LNG}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all hover:scale-[1.02] border-[1.5px] border-hearth text-hearth font-sans"
      >
        Open in Google Maps
      </a>
    </div>
  );
}

export function BakeryMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);
  const [usesFallback, setUsesFallback] = useState(!MAPBOX_TOKEN);

  useEffect(() => {
    if (!MAPBOX_TOKEN || !containerRef.current) {
      // Defer setState to avoid synchronous call in effect body
      const t = setTimeout(() => setUsesFallback(true), 0);
      return () => clearTimeout(t);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let map: any = null;

    (async () => {
      try {
        // Dynamic require — bypasses TypeScript module resolution
        // Install mapbox-gl to enable: npm i mapbox-gl @types/mapbox-gl
        const mapboxgl = await new Function('return import("mapbox-gl")')();
        const mbgl = mapboxgl.default;

        mbgl.accessToken = MAPBOX_TOKEN;

        map = new mbgl.Map({
          container: containerRef.current!,
          style: 'mapbox://styles/mapbox/light-v11',
          center: [BAKERY_LNG, BAKERY_LAT],
          zoom: 15.5,
          pitch: 45,
          bearing: -17,
          attributionControl: false,
        });

        map.addControl(new mbgl.NavigationControl(), 'top-right');

        // Custom marker
        const el = document.createElement('div');
        el.style.cssText = 'width:40px;height:40px;background:#E4B363;border:3px solid white;border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,0.25);display:flex;align-items:center;justify-content:center;';
        el.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 2C8.5 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3.5-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>';

        new mbgl.Marker(el)
          .setLngLat([BAKERY_LNG, BAKERY_LAT])
          .addTo(map);

        map.on('load', () => setMapReady(true));
      } catch {
        setUsesFallback(true);
      }
    })();

    return () => {
      try { map?.remove(); } catch { /* cleanup */ }
    };
  }, []);

  if (usesFallback) return <MapFallback />;

  return (
    <div className="relative rounded-2xl overflow-hidden min-h-100 md:min-h-0 h-full">
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ opacity: mapReady ? 1 : 0, transition: 'opacity 0.5s ease' }}
      />
      {!mapReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-earth">
          <div className="w-8 h-8 rounded-full border-2 border-grove border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
}
