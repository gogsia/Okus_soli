'use client';
import { useState, useCallback, useRef, useEffect } from 'react';

interface AudioLayer {
  source: AudioBufferSourceNode;
  gain: GainNode;
}

export function useAudioContext() {
  const ctxRef = useRef<AudioContext | null>(null);
  const layersRef = useRef<Map<string, AudioLayer>>(new Map());
  const abortRef = useRef<AbortController | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const init = useCallback(async () => {
    if (ctxRef.current) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') await ctx.resume();
    ctxRef.current = ctx;
    abortRef.current = new AbortController();
    setInitialized(true);
  }, []);

  const loadLayer = useCallback(async (id: string, url: string, loop = true, volume = 0.3) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    try {
      const res = await fetch(url, { signal: abortRef.current?.signal });
      const buffer = await ctx.decodeAudioData(await res.arrayBuffer());
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      source.buffer = buffer;
      source.loop = loop;
      source.connect(gain).connect(ctx.destination);
      layersRef.current.set(id, { source, gain });
      source.start(0);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      // Silently fail if audio can't be loaded
    }
  }, []);

  const toggle = useCallback(async () => {
    if (!initialized) await init();
    const ctx = ctxRef.current;
    if (!ctx) return;
    setEnabled((prev) => {
      if (prev) {
        ctx.suspend();
      } else {
        ctx.resume();
      }
      return !prev;
    });
  }, [initialized, init]);

  const playSfx = useCallback(async (url: string, volume = 0.25) => {
    const ctx = ctxRef.current;
    if (ctx?.state !== 'running') return;
    try {
      const res = await fetch(url, { signal: abortRef.current?.signal });
      const buffer = await ctx.decodeAudioData(await res.arrayBuffer());
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      source.buffer = buffer;
      source.connect(gain).connect(ctx.destination);
      source.start(0);
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      // Silently fail
    }
  }, []);

  useEffect(() => {
    const layers = layersRef.current;
    const abort = abortRef.current;
    return () => {
      abort?.abort();
      layers.forEach(({ source }) => {
        try { source.stop(); } catch { /* already stopped */ }
      });
      ctxRef.current?.close();
    };
  }, []);

  return { enabled, initialized, toggle, init, loadLayer, playSfx };
}
