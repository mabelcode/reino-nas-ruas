import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../lib/utils';

export const runtime = 'edge';

export const revalidate = 86400; // cache for 24 hours

// Interface para tipagem da resposta da API
interface About {
  id: string;
  history: string;
  mission: string;
  vision: string;
  values: string;
  about_image?: string;
  date_created?: string;
  date_updated?: string | null;
  user_updated?: string | null;
}

// Usando o tipo About para validação
const validateAboutData = (data: unknown): data is About => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'history' in data &&
    'mission' in data &&
    'vision' in data &&
    'values' in data
  );
};

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    const res = await fetch(`${config.DIRECTUS_URL}/items/about`, {
      headers: { Authorization: `Bearer ${config.DIRECTUS_TOKEN}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch about' }, { status: res.status });
    }

    const data = await res.json();
    
    // Validando dados usando o tipo About
    if (data.data && validateAboutData(data.data)) {
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
