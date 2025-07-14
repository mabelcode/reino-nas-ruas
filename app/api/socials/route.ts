import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export const revalidate = 86400; // cache for 24 hours

interface Social {
  id: string;
  platform: string;
  url: string;
}

export async function GET() {
  if (!DIRECTUS_URL || !TOKEN) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${DIRECTUS_URL}/items/social_media`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
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
