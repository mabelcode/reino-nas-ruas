import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const revalidate = 86400;

export async function GET(request: Request, context: any) {
  const DIRECTUS_URL = context?.env?.DIRECTUS_URL || process.env.DIRECTUS_URL;
  const DIRECTUS_TOKEN = context?.env?.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;

  if (!DIRECTUS_URL) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const res = await fetch(`${DIRECTUS_URL}/items/projects`, {
    headers: DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {},
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(
    { data: data.data },
    {
      status: 200,
      headers: {
        'Cache-Control': `public, max-age=${revalidate}`,
      },
    }
  );
}
