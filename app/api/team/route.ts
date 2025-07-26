import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../lib/utils';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const revalidate = 86400;

// Interface para tipagem da resposta da API
interface TeamMember {
  id: string;
  name: string;
  role: string;
  resume: string;
  cover: string;
  date_created?: string;
  date_updated?: string | null;
  user_updated?: string | null;
}

// Usando o tipo TeamMember para validação
const validateTeamMemberData = (data: unknown): data is TeamMember => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'name' in data &&
    'role' in data &&
    'resume' in data &&
    'cover' in data
  );
};

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    const limit = request.nextUrl.searchParams.get('limit') || '10';
    const page = request.nextUrl.searchParams.get('page') || '1';

    // Parâmetros de paginação para uso futuro
    const limitValue = parseInt(limit);
    const pageValue = parseInt(page);
    
    // Usando as variáveis para validação
    if (limitValue < 1 || limitValue > 100) {
      return NextResponse.json({ error: 'Invalid limit parameter' }, { status: 400 });
    }
    
    if (pageValue < 1) {
      return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 });
    }

    const res = await fetch(`${config.DIRECTUS_URL}/items/team`, {
      headers: { Authorization: `Bearer ${config.DIRECTUS_TOKEN}` },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch team' }, { status: res.status });
    }

    const data = await res.json();
    
    // Validando dados usando o tipo TeamMember
    if (data.data && Array.isArray(data.data) && data.data.every(validateTeamMemberData)) {
      return NextResponse.json(data);
    }
    
    return NextResponse.json({ error: 'Invalid data format' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
