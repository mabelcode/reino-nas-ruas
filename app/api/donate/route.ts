import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

interface DonateInfo {
  id: string;
  date_created?: string;
  user_updated?: string | null;
  date_updated?: string | null;
  pix: string;
  suggested_values: string[];
}

export async function GET(request: Request, context: { env?: { DIRECTUS_URL?: string, DIRECTUS_TOKEN?: string } } = {}) {
  const DIRECTUS_URL = context.env?.DIRECTUS_URL || process.env.DIRECTUS_URL;
  const DIRECTUS_TOKEN = context.env?.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;

  if (!DIRECTUS_URL) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const res = await fetch(`${DIRECTUS_URL}/items/donate`, {
    headers: DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {}
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch donation info' },
      { status: res.status }
    );
  }

  const response = await res.json();
  const data = response.data as DonateInfo;

  if (!data || !data.pix || !data.suggested_values) {
    return NextResponse.json(
      { error: 'Invalid donation data format' },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { data },
    { status: 200 }
  );
}
