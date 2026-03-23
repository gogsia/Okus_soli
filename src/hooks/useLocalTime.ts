'use client';
import { useSyncExternalStore } from 'react';

interface TimeInfo {
  hours: number;
  minutes: number;
  isOpen: boolean;
  statusText: string;
}

const DEFAULT_TIME: TimeInfo = { hours: 0, minutes: 0, isOpen: false, statusText: '' };

function computeTime(): TimeInfo {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const day = now.getDay();
  const isWeekend = day === 0 || day === 6;
  const openHour = isWeekend ? 8 : 7;
  let closeHour = 19;
  if (day === 0) closeHour = 18;
  else if (day === 6) closeHour = 20;
  const isOpen = h >= openHour && h < closeHour;

  let statusText = '';
  if (isOpen) {
    statusText = closeHour - h <= 1 ? 'Closing soon' : 'Open now';
  } else {
    let nextOpen: string;
    if (h >= closeHour) {
      nextOpen = `tomorrow at ${isWeekend ? '08:00' : '07:00'}`;
    } else {
      nextOpen = `at ${String(openHour).padStart(2, '0')}:00`;
    }
    statusText = `Opens ${nextOpen}`;
  }

  return { hours: h, minutes: m, isOpen, statusText };
}

let cached: TimeInfo = DEFAULT_TIME;
const listeners = new Set<() => void>();

function refresh() {
  cached = computeTime();
  listeners.forEach((cb) => cb());
}

if (globalThis.window !== undefined) {
  cached = computeTime();
  setInterval(refresh, 30000);
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return cached;
}

function getServerSnapshot() {
  return DEFAULT_TIME;
}

export function useLocalTime(): TimeInfo {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
