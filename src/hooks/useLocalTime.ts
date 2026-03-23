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
  // Show time in Šibenik timezone (Europe/Zagreb)
  const now = new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Zagreb',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const dayFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Zagreb',
    weekday: 'short',
  });

  const parts = formatter.formatToParts(now);
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0);
  const dayStr = dayFormatter.format(now);
  const isSunday = dayStr === 'Sun';

  // Mon–Sat 09:00–15:00, Sunday closed
  const isOpen = !isSunday && h >= 9 && h < 15;

  let statusText = '';
  if (isSunday) {
    statusText = 'Closed today — opens Monday at 09:00';
  } else if (isOpen) {
    statusText = 15 - h <= 1 ? 'Closing soon' : 'Open now';
  } else if (h >= 15) {
    statusText = isSunday ? 'Opens Monday at 09:00' : 'Opens tomorrow at 09:00';
  } else {
    statusText = 'Opens at 09:00';
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
