import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const revalidate = 86400; // cache for 24 horas

interface Social {
  id: string;
  platform: string;
  url: string;
}

export async function GET(request: Request, context: { env?: { DIRECTUS_URL?: string, DIRECTUS_TOKEN?: string } } = {}) {
  const DIRECTUS_URL = context.env?.DIRECTUS_URL || process.env.DIRECTUS_URL;
  const DIRECTUS_TOKEN = context.env?.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;

  if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${DIRECTUS_URL}/items/social_media`, {
      headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
      next: { revalidate },
    });

    if (!res.ok) throw new Error('Failed to fetch social media');

    const socials: Social[] = (await res.json()).data;

    return NextResponse.json(
      { data: socials },
      {
        status: 200,
        headers: {
          'Cache-Control': `public, max-age=${revalidate}`,
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch social media' },
      { status: 500 }
    );
  }
}
