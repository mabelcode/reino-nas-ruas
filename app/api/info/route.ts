import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../lib/utils';

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

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    const infoRes = await fetch(`${config.DIRECTUS_URL}/items/infos`, {
      headers: {
        Authorization: `Bearer ${config.DIRECTUS_TOKEN}`,
      },
    });

    if (!infoRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch info' }, { status: infoRes.status });
    }

    const data = await infoRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
