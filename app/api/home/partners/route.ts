import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../../lib/utils';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

// Interface para tipagem da resposta da API
interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
  date_created?: string;
  date_updated?: string | null;
  user_updated?: string | null;
}

// Usando o tipo Partner para validação
const validatePartnerData = (data: unknown): data is Partner => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'logo' in data
  );
};

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    const res = await fetch(`${config.DIRECTUS_URL}/items/partners`, {
      headers: { Authorization: `Bearer ${config.DIRECTUS_TOKEN}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch partners' }, { status: res.status });
    }

    const data = await res.json();
    
    // Validando dados usando o tipo Partner
    if (data.data && Array.isArray(data.data) && data.data.every(validatePartnerData)) {
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}