import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../../lib/utils';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

interface Partner {
    id: string;
    name: string;
    logo: string;
    website: string;
    category: string;
    date_created: string;
    date_updated: string | null;
}

export const revalidate = 86400;

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    const partnersRes = await fetch(`${config.DIRECTUS_URL}/items/partners`, {
      headers: { Authorization: `Bearer ${config.DIRECTUS_TOKEN}` },
    });

    if (!partnersRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch partners' }, { status: partnersRes.status });
    }

    const data = await partnersRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}