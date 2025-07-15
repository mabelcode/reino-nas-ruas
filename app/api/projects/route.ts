import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export const revalidate = 86400;

export async function GET() {
  if (!DIRECTUS_URL) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const res = await fetch(`${DIRECTUS_URL}/items/projects`, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
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
