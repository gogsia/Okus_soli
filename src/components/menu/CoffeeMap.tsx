'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface CoffeeOrigin {
  id: string;
  name: string;
  coords: [number, number]; // [lat, lng]
  flavor: string[];
  color: string;
}

const origins: CoffeeOrigin[] = [
  { id: 'colombia', name: 'Huila, Colombia', coords: [4.5, -74.0], flavor: ['chocolate', 'caramel', 'citrus'], color: '#E4B363' },
  { id: 'ethiopia', name: 'Yirgacheffe, Ethiopia', coords: [6.2, 38.2], flavor: ['jasmine', 'blueberry', 'peach'], color: '#C27E5A' },
  { id: 'guatemala', name: 'Antigua, Guatemala', coords: [14.5, -90.7], flavor: ['brown sugar', 'apple', 'cedar'], color: '#7A8B6B' },
  { id: 'kenya', name: 'Nyeri, Kenya', coords: [0.4, 37.0], flavor: ['blackcurrant', 'tomato', 'grapefruit'], color: '#3A2C29' },
];

// Convert lat/lng to x/y on a simple mercator map (0-100% range)
function toMapCoords(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 100;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = 50 - (mercN / Math.PI) * 50;
  return { x, y };
}

export function CoffeeMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeOrigin, setActiveOrigin] = useState<CoffeeOrigin | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReduced = useReducedMotion();
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const drawRef = useRef<() => void>(() => {});

  const drawMap = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    // Background
    ctx.fillStyle = '#F5EDE0';
    ctx.fillRect(0, 0, w, h);

    // Simple world outline (stylized dots for land masses)
    ctx.fillStyle = '#E3D9D2';
    // Draw simplified continents as rounded rects
    const continents = [
      { x: 10, y: 15, w: 18, h: 30 }, // Americas
      { x: 32, y: 20, w: 8, h: 10 },  // W. Africa
      { x: 42, y: 12, w: 15, h: 25 }, // Africa
      { x: 55, y: 8, w: 20, h: 20 },  // Asia
      { x: 60, y: 35, w: 12, h: 15 }, // SE Asia
      { x: 75, y: 40, w: 10, h: 10 }, // Australia
      { x: 25, y: 10, w: 25, h: 15 }, // Europe
    ];
    continents.forEach((c) => {
      const rx = (c.x / 100) * w;
      const ry = (c.y / 100) * h;
      const rw = (c.w / 100) * w;
      const rh = (c.h / 100) * h;
      ctx.beginPath();
      ctx.roundRect(rx, ry, rw, rh, 8);
      ctx.fill();
    });

    // Equator line
    ctx.strokeStyle = 'rgba(228, 179, 99, 0.2)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.beginPath();
    ctx.moveTo(0, h * 0.5);
    ctx.lineTo(w, h * 0.5);
    ctx.stroke();
    ctx.setLineDash([]);

    // Coffee belt (tropical zone)
    ctx.fillStyle = 'rgba(228, 179, 99, 0.06)';
    ctx.fillRect(0, h * 0.35, w, h * 0.3);

    // Draw origin markers
    timeRef.current += 0.02;
    origins.forEach((origin) => {
      const { x, y } = toMapCoords(origin.coords[0], origin.coords[1]);
      const px = (x / 100) * w;
      const py = (y / 100) * h;
      const isHovered = hoveredId === origin.id;
      const isActive = activeOrigin?.id === origin.id;
      const pulseScale = 1 + Math.sin(timeRef.current * 2 + origins.indexOf(origin)) * 0.15;

      // Pulse ring
      if (!prefersReduced) {
        ctx.beginPath();
        ctx.arc(px, py, (isHovered ? 18 : 14) * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = origin.color + '20';
        ctx.fill();
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(px, py, isHovered || isActive ? 12 : 8, 0, Math.PI * 2);
      ctx.fillStyle = origin.color + '40';
      ctx.fill();

      // Inner dot
      ctx.beginPath();
      ctx.arc(px, py, isHovered || isActive ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = origin.color;
      ctx.fill();

      // Label
      ctx.font = `${isHovered || isActive ? '600' : '400'} 11px Inter, sans-serif`;
      ctx.fillStyle = '#4A3B36';
      ctx.textAlign = 'center';
      ctx.fillText(origin.name.split(',')[0], px, py - 16);
    });

    if (!prefersReduced) {
      animRef.current = requestAnimationFrame(() => drawRef.current());
    }
  }, [hoveredId, activeOrigin, prefersReduced]);

  useEffect(() => {
    drawRef.current = drawMap;
    drawMap();
    if (prefersReduced) return;
    return () => cancelAnimationFrame(animRef.current);
  }, [drawMap, prefersReduced]);

  // Handle resize
  useEffect(() => {
    const resize = () => drawMap();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawMap]);

  // Mouse interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    let found: string | null = null;
    for (const origin of origins) {
      const { x, y } = toMapCoords(origin.coords[0], origin.coords[1]);
      const px = (x / 100) * w;
      const py = (y / 100) * h;
      const dist = Math.hypot(mx - px, my - py);
      if (dist < 20) {
        found = origin.id;
        break;
      }
    }
    setHoveredId(found);
    canvas.style.cursor = found ? 'pointer' : 'default';
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;

    for (const origin of origins) {
      const { x, y } = toMapCoords(origin.coords[0], origin.coords[1]);
      const px = (x / 100) * w;
      const py = (y / 100) * h;
      const dist = Math.hypot(mx - px, my - py);
      if (dist < 20) {
        setActiveOrigin(activeOrigin?.id === origin.id ? null : origin);
        return;
      }
    }
    setActiveOrigin(null);
  };

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <p className="section-label mb-2">Od Podrijetla do Šalice</p>
        <h3
          className="text-2xl md:text-3xl font-display"
        >
          Odakle Dolazi Naša <span className="text-sun">Kava</span>
        </h3>
      </div>

      <div className="relative rounded-2xl overflow-hidden" style={{ background: '#F5EDE0' }}>
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: 320 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredId(null)}
          onClick={handleClick}
          aria-label="Interaktivna karta podrijetla kave — Kolumbija, Etiopija, Gvatemala i Kenija"
          role="img"
        />

        {/* Origin detail panel */}
        {activeOrigin && (
          <div
            className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-72 p-4 rounded-xl backdrop-blur-md"
            style={{
              background: 'rgba(253, 248, 240, 0.92)',
              border: `2px solid ${activeOrigin.color}`,
            }}
          >
            <h4
              className="text-lg mb-1 font-serif font-medium"
              style={{ color: activeOrigin.color }}
            >
              {activeOrigin.name}
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {activeOrigin.flavor.map((f) => (
                <span
                  key={f}
                  className="text-xs px-2 py-1 rounded-full text-bark font-sans"
                  style={{
                    background: activeOrigin.color + '18',
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 flex-wrap">
        {origins.map((origin) => (
          <button
            type="button"
            key={origin.id}
            onClick={() => setActiveOrigin(activeOrigin?.id === origin.id ? null : origin)}
            className="flex items-center gap-2 text-xs transition-opacity duration-200 font-sans text-secondary"
            style={{
              opacity: activeOrigin && activeOrigin.id !== origin.id ? 0.4 : 1,
            }}
          >
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: origin.color }}
            />
            {origin.name.split(',')[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
