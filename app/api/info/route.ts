import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../lib/utils';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const revalidate = 86400;

// Interface para tipagem da resposta da API
interface ONGInfo {
  id: string;
  date_created?: string;
  user_updated?: string | null;
  date_updated?: string | null;
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

// Usando o tipo ONGInfo para validação
const validateONGInfoData = (data: unknown): data is ONGInfo => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'email' in data &&
    'phone' in data &&
    'cnpj' in data &&
    'founded_year' in data &&
    'street' in data &&
    'number' in data &&
    'neighborhood' in data &&
    'city' in data &&
    'state' in data &&
    'zipcode' in data
  );
};

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    const res = await fetch(`${config.DIRECTUS_URL}/items/infos`, {
      headers: { Authorization: `Bearer ${config.DIRECTUS_TOKEN}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch info' }, { status: res.status });
    }

    const data = await res.json();
    
    // Validando dados usando o tipo ONGInfo
    if (data.data && validateONGInfoData(data.data)) {
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
