import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export const revalidate = 86400; // cache for 24 hours

interface ONGInfo {
  id: string;
  email: string;
  phone: string;
  cnpj: string;
  founded_year: number;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  zipcode: string;
  email_2?: string | null;
  phone_2?: string | null;
  working_days_1?: string | null;
  working_days_2?: string | null;
  working_days_3?: string | null;
}

export async function GET() {
  if (!DIRECTUS_URL || !TOKEN) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 }
    );
  }

  const infoRes = await fetch(`${DIRECTUS_URL}/items/infos`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    next: { revalidate },
  });

  if (!infoRes.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch info' },
      { status: infoRes.status }
    );
  }

  const info: ONGInfo = (await infoRes.json()).data;

  return NextResponse.json(
    { data: info },
    {
      status: 200,
      headers: {
        'Cache-Control': `public, max-age=${revalidate}`,
      },
    }
  );
}
