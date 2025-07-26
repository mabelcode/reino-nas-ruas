import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../lib/utils';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    const res = await fetch(
      `${config.DIRECTUS_URL}/items/financial_reports?fields=*,file.id,file.filesize&sort=-date`,
      {
        headers: {
          Authorization: `Bearer ${config.DIRECTUS_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch financial reports' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 