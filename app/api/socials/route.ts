import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../lib/utils';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const revalidate = 86400; // cache for 24 horas

// Interface para tipagem da resposta da API
interface Social {
  id: string;
  platform: string;
  url: string;
  icon?: string;
  date_created?: string;
  date_updated?: string | null;
  user_updated?: string | null;
}

// Usando o tipo Social para validação
const validateSocialData = (data: unknown): data is Social => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'platform' in data &&
    'url' in data
  );
};

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    const res = await fetch(`${config.DIRECTUS_URL}/items/social_media`, {
      headers: { Authorization: `Bearer ${config.DIRECTUS_TOKEN}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch socials' }, { status: res.status });
    }

    const data = await res.json();
    
    // Validando dados usando o tipo Social
    if (data.data && Array.isArray(data.data) && data.data.every(validateSocialData)) {
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
