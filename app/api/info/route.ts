import { NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

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

export async function GET(request: Request, context: any) {
  const { DIRECTUS_URL, DIRECTUS_TOKEN } = getEnv(context);

  console.log('env var test:', context?.env?.DIRECTUS_URL, context?.env?.DIRECTUS_TOKEN);
  console.log('DIRECTUS_URL', DIRECTUS_URL);
  console.log('DIRECTUS_TOKEN', DIRECTUS_TOKEN);


  const infoRes = await fetch(`${DIRECTUS_URL}/items/infos`, {
    headers: {
      Authorization: `Bearer ${DIRECTUS_TOKEN}`,
    },
    next: { revalidate },
  });

  if (!infoRes.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch info' },
      { status: infoRes.status }
    );
  }

  const raw = await infoRes.json();
  console.log('raw response:', raw);

  const info: ONGInfo = raw.data;

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
