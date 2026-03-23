// ── Mood Engine ──
export const MOOD_MODES = ['DAWN_CRISP', 'MIDDAY_FULL', 'AMBER_HOUR', 'NOCTURNE'] as const;
export const SSR_DEFAULT_MOOD = 'MIDDAY_FULL' as const;
export const MOOD_UPDATE_INTERVAL = 60_000; // 1 minute

// ── Menu Categories ──
export const MENU_CATEGORIES = [
  { id: 'breads', label: 'Breads', sfx: '/audio/sfx/crust-crackle.mp3' },
  { id: 'breakfast', label: 'Breakfast & Brunch', sfx: '/audio/sfx/knife-board.mp3' },
  { id: 'coffee', label: 'Coffee & Drinks', sfx: '/audio/sfx/grinder-burst.mp3' },
  { id: 'appetizers', label: 'Appetizers', sfx: '/audio/sfx/paper-rustle.mp3' },
] as const;

export type MenuCategory = typeof MENU_CATEGORIES[number]['id'];

// ── Gallery Chapters ──
export const GALLERY_CHAPTERS = [
  { id: 'dawn', label: 'Dawn' },
  { id: 'the-rise', label: 'The Rise' },
  { id: 'the-pour', label: 'The Pour' },
  { id: 'the-table', label: 'The Table' },
  { id: 'golden-hour', label: 'Golden Hour' },
] as const;

// ── Business Hours ──
export const HOURS_DATA = [
  { day: 'Monday\u2013Saturday', open: '09:00', close: '15:00', note: 'Breakfast & brunch all day', rushNote: 'Morning rush 09:00\u201311:00' },
  { day: 'Sunday', open: 'Closed', close: 'Closed', note: 'See you Monday!' },
] as const;

// ── Navigation Links ──
export const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/story', label: 'Our Story' },
  { href: '/visit', label: 'Visit' },
] as const;

// ── Easter Egg Triggers ──
export const EASTER_EGG_HOURS = {
  sunrise: { hour: 6, maxMinutes: 30 },
  sunset: { hour: 19, maxMinutes: 30 },
} as const;

// ── API ──
export const INSTAGRAM_CACHE_DURATION = 60 * 15; // 15 minutes in seconds
export const INSTAGRAM_FEED_LIMIT = 12;
export const INSTAGRAM_DISPLAY_COUNT = 8;

// ── Site Info ──
export const SITE_URL = 'https://okus-soli-gamma.vercel.app';
export const SITE_NAME = 'Okus Soli by Pa\u2019kai';
