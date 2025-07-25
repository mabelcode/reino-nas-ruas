import { NextResponse } from 'next/server';

export const runtime = 'edge';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export const revalidate = 604800; // cache for 1 week

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

  // Buscar o id da imagem do Directus
  const itemRes = await fetch(`${DIRECTUS_URL}/items/hero`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    // Não usar next: { revalidate } aqui
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

  // Buscar a imagem binária
  const imageRes = await fetch(`${DIRECTUS_URL}/assets/${imageId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!imageRes.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch hero image' },
      { status: imageRes.status }
    );
  }

  const contentType = imageRes.headers.get('content-type') || 'image/jpeg';

  return new Response(imageRes.body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=604800, immutable',
    },
  });
}
