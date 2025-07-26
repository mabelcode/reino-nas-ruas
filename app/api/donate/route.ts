import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../lib/utils';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

// Interface para tipagem da resposta da API
interface DonateInfo {
  id: string;
  date_created?: string;
  user_updated?: string | null;
  date_updated?: string | null;
  pix: string;
  suggested_values: string[];
}

// Usando o tipo DonateInfo para validação
const validateDonateInfoData = (data: unknown): data is DonateInfo => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'pix' in data &&
    'suggested_values' in data &&
    Array.isArray((data as DonateInfo).suggested_values)
  );
};

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    const res = await fetch(`${config.DIRECTUS_URL}/items/donate`, {
      headers: { Authorization: `Bearer ${config.DIRECTUS_TOKEN}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch donate info' }, { status: res.status });
    }

    const data = await res.json();
    
    // Validando dados usando o tipo DonateInfo
    if (data.data && validateDonateInfoData(data.data)) {
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
