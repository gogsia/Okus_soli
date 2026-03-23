'use client';
import { useSyncExternalStore } from 'react';

export type MoodMode = 'DAWN_CRISP' | 'MIDDAY_FULL' | 'AMBER_HOUR' | 'NOCTURNE';

function getMood(): MoodMode {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 10) return 'DAWN_CRISP';
  if (hour >= 10 && hour < 16) return 'MIDDAY_FULL';
  if (hour >= 16 && hour < 20) return 'AMBER_HOUR';
  return 'NOCTURNE';
}

const SSR_DEFAULT: MoodMode = 'MIDDAY_FULL';

let currentMood: MoodMode = SSR_DEFAULT;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return currentMood;
}

function getServerSnapshot() {
  return SSR_DEFAULT;
}

// Update mood periodically
if (globalThis.window !== undefined) {
  currentMood = getMood();
  setInterval(() => {
    const next = getMood();
    if (next !== currentMood) {
      currentMood = next;
      listeners.forEach((cb) => cb());
    }
  }, 60000);
}

export function useMoodEngine(): MoodMode {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
