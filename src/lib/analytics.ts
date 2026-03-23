import type { MoodMode } from '@/hooks/useMoodEngine';

let startTime = 0;

function getMoodMode(): MoodMode {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 10) return 'DAWN_CRISP';
  if (hour >= 10 && hour < 16) return 'MIDDAY_FULL';
  if (hour >= 16 && hour < 20) return 'AMBER_HOUR';
  return 'NOCTURNE';
}

function getTimeOnSite(): number {
  if (!startTime) return 0;
  return Math.round((Date.now() - startTime) / 1000);
}

function safeLocalStorage(action: 'get' | 'set', key: string, value?: string): string | null {
  try {
    if (action === 'get') return localStorage.getItem(key);
    if (value !== undefined) localStorage.setItem(key, value);
    return null;
  } catch {
    return null;
  }
}

export function trackSoulMetric(event: string, props: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;

  const payload = {
    event,
    ...props,
    moodMode: getMoodMode(),
    timeOnSite: getTimeOnSite(),
    isReturn: !!safeLocalStorage('get', 'okus-visited'),
    timestamp: new Date().toISOString(),
  };

  if (process.env.NODE_ENV === 'development') {
    console.log('[Soul Metric]', payload);
  }

  if (!safeLocalStorage('get', 'okus-visited')) {
    safeLocalStorage('set', 'okus-visited', new Date().toISOString());
  }
}

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  startTime = Date.now();
  trackSoulMetric('session_start');
}
