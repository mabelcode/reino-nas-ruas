import { NextResponse } from 'next/server';

export const runtime = 'edge';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export const revalidate = 86400; // cache for 24 hours

interface DirectusHeroResponse {
  data?: {
    hero_image?: string;
  };
}

export async function GET() {
  if (!DIRECTUS_URL || !TOKEN) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  const itemRes = await fetch(`${DIRECTUS_URL}/items/hero`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    next: { revalidate },
  });

  if (!itemRes.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch hero item' },
      { status: itemRes.status }
    );
  }

  const item: DirectusHeroResponse = await itemRes.json();
  const imageId = item?.data?.hero_image;

  if (!imageId) {
    return NextResponse.json(
      { error: 'Hero image not found' },
      { status: 404 }
    );
  }

  const imageRes = await fetch(`${DIRECTUS_URL}/assets/${imageId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    next: { revalidate },
  });

  if (!imageRes.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch hero image' },
      { status: imageRes.status }
    );
  }

  return NextResponse.redirect(`${BASE_URL}/api/assets/${imageId}`, { status: 307 });
}
