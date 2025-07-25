import { NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const revalidate = 86400;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  resume: string;
  cover?: string;
  date_created?: string;
  date_updated?: string | null;
  user_updated?: string | null;
}

export async function GET(request: Request, context: any) {
  const { DIRECTUS_URL, DIRECTUS_TOKEN } = getEnv(context);

  const res = await fetch(`${DIRECTUS_URL}/items/team`, {
    headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch team' },
      { status: res.status }
    );
  }

  const team: TeamMember[] = (await res.json()).data;

  return NextResponse.json(
    { data: team },
    {
      status: 200,
      headers: {
        'Cache-Control': `public, max-age=${revalidate}`,
      },
    }
  );
}
