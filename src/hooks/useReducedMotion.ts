'use client';
import { useSyncExternalStore } from 'react';

const MQL = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void) {
  if (globalThis.window === undefined) return () => {};
  const mql = globalThis.window.matchMedia(MQL);
  mql.addEventListener('change', callback);
  return () => mql.removeEventListener('change', callback);
}

function getSnapshot() {
  return globalThis.window.matchMedia(MQL).matches;
}

function getServerSnapshot() {
  return false;
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
