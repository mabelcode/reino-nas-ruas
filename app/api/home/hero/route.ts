import { NextResponse } from 'next/server';
import { fetchDirectusAsset } from '@/lib/fetch-directus-asset';

export const runtime = 'edge';

interface DirectusHeroResponse {
  data?: {
    hero_image?: string;
  };
}

export async function GET(context: any) {
  const DIRECTUS_URL = context?.env?.DIRECTUS_URL || process.env.DIRECTUS_URL;
  const DIRECTUS_TOKEN = context?.env?.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;

  if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  // Buscar o id da imagem do Directus
  const itemRes = await fetch(`${DIRECTUS_URL}/items/hero`, {
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
    },
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

  return fetchDirectusAsset(imageId, context);
}
