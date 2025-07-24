import { NextResponse } from 'next/server';

export const runtime = 'edge';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export const revalidate = 86400; // cache for 24 hours

interface About {
  id: string;
  history: string;
  mission: string;
  vision: string;
  values: string;
  about_image?: string;
  date_created?: string;
  date_updated?: string | null;
  user_updated?: string | null;
}

export async function GET() {
  if (!DIRECTUS_URL || !TOKEN) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  const res = await fetch(`${DIRECTUS_URL}/items/about`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch about info' },
      { status: res.status }
    );
  }

  const about: About = (await res.json()).data;

  return NextResponse.json(
    { data: about },
    {
      status: 200,
      headers: {
        'Cache-Control': `public, max-age=${revalidate}`,
      },
    }
  );
}
