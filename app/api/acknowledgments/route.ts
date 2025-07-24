import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const revalidate = 86400;

interface Acknowledgment {
  id: string;
  year: number;
  title: string;
  subtitle?: string;
  authority?: string;
  date_created?: string;
  date_updated?: string | null;
}

export async function GET(request: Request, context: any) {
  const DIRECTUS_URL = context?.env?.DIRECTUS_URL || process.env.DIRECTUS_URL;
  const DIRECTUS_TOKEN = context?.env?.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;

  if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  const res = await fetch(`${DIRECTUS_URL}/items/acknowledgments`, {
    headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch acknowledgments' },
      { status: res.status }
    );
  }

  const acknowledgments: Acknowledgment[] = (await res.json()).data;

  return NextResponse.json(
    { data: acknowledgments },
    {
      status: 200,
      headers: {
        'Cache-Control': `public, max-age=${revalidate}`,
      },
    }
  );
}
