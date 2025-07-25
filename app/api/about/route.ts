import { NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';

export const runtime = 'edge';

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

export async function GET(request: Request, context: any) {
  const { DIRECTUS_URL, DIRECTUS_TOKEN } = getEnv(context);

  const res = await fetch(`${DIRECTUS_URL}/items/about`, {
    headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
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
