import { NextResponse } from 'next/server';

export interface InstagramPost {
  id: string;
  caption?: string;
  media_url: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}

interface InstagramAPIResponse {
  data: InstagramPost[];
  paging?: {
    cursors: { before: string; after: string };
    next?: string;
  };
}

const INSTAGRAM_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const CACHE_DURATION = 60 * 15; // 15 minutes
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30; // max requests per window

let cachedData: { posts: InstagramPost[]; timestamp: number } | null = null;
const requestLog: number[] = [];

function checkRateLimit(): boolean {
  const now = Date.now();
  // Remove old entries outside the window
  while (requestLog.length > 0 && requestLog[0] < now - RATE_LIMIT_WINDOW) {
    requestLog.shift();
  }
  if (requestLog.length >= RATE_LIMIT_MAX) return false;
  requestLog.push(now);
  return true;
}

export async function GET() {
  // Rate limiting
  if (!checkRateLimit()) {
    return NextResponse.json(
      { error: 'Too many requests', posts: [] },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  // Return cached data if fresh
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION * 1000) {
    return NextResponse.json({ posts: cachedData.posts, cached: true });
  }

  if (!INSTAGRAM_TOKEN) {
    return NextResponse.json(
      { error: 'Instagram token not configured', posts: [] },
      { status: 503 }
    );
  }

  try {
    const fields = 'id,caption,media_url,media_type,thumbnail_url,permalink,timestamp';
    const limit = 12;
    const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=${limit}&access_token=${INSTAGRAM_TOKEN}`;

    const res = await fetch(url, { next: { revalidate: CACHE_DURATION } });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('[Instagram API] Error:', res.status, errorBody);
      return NextResponse.json(
        { error: 'Failed to fetch Instagram feed', posts: [] },
        { status: 502 }
      );
    }

    const data: InstagramAPIResponse = await res.json();
    const posts = data.data || [];

    // Update cache
    cachedData = { posts, timestamp: Date.now() };

    return NextResponse.json({ posts, cached: false });
  } catch (error) {
    console.error('[Instagram API] Fetch error:', error);
    return NextResponse.json(
      { error: 'Instagram fetch failed', posts: [] },
      { status: 500 }
    );
  }
}
