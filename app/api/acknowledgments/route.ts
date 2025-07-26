import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../lib/utils';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const revalidate = 86400;

// Interface para tipagem da resposta da API
interface Acknowledgment {
  id: string;
  year: number;
  title: string;
  subtitle?: string;
  authority?: string;
  date_created?: string;
  date_updated?: string | null;
}

// Usando o tipo Acknowledgment para validação
const validateAcknowledgmentData = (data: unknown): data is Acknowledgment => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'year' in data &&
    'title' in data
  );
};

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    const res = await fetch(`${config.DIRECTUS_URL}/items/acknowledgments`, {
      headers: { Authorization: `Bearer ${config.DIRECTUS_TOKEN}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch acknowledgments' }, { status: res.status });
    }

    const data = await res.json();
    
    // Validando dados usando o tipo Acknowledgment
    if (data.data && Array.isArray(data.data) && data.data.every(validateAcknowledgmentData)) {
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
