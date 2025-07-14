import { NextResponse } from 'next/server';

const BASE_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export const revalidate = 60 * 60; // cache for 1 hour

export async function GET() {
  if (!BASE_URL || !TOKEN) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  const itemRes = await fetch(`${BASE_URL}/items/hero`, {
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

  const item = await itemRes.json();
  const imageId = item?.data?.hero_image;

  if (!imageId) {
    return NextResponse.json(
      { error: 'Hero image not found' },
      { status: 404 }
    );
  }

  const imageRes = await fetch(`${BASE_URL}/assets/${imageId}`, {
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

  const contentType = imageRes.headers.get('content-type') ||
    'application/octet-stream';

  return new Response(imageRes.body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': `public, max-age=${revalidate}`,
    },
  });
}
