import { NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';

const { DIRECTUS_URL, DIRECTUS_TOKEN: TOKEN } = getEnv();

export const runtime = 'edge';

export const revalidate = 1209600; // cache for 2 weeks

export async function GET() {

  const res = await fetch(`${DIRECTUS_URL}/items/financial_year`, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch financial data' },
      { status: res.status },
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
    },
  );
}
