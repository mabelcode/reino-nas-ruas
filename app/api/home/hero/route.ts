import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../../lib/utils';
import { fetchDirectusAsset } from '../../../../lib/fetch-directus-asset';

export const runtime = 'edge';

interface DirectusHeroResponse {
  data?: {
    hero_image?: string;
  };
}

export async function GET(request: NextRequest, context: any) {
  const config = getDirectusConfig(context);

  try {
    // Busca os dados do hero do Directus
    const itemRes = await fetch(`${config.DIRECTUS_URL}/items/hero`, {
      headers: {
        Authorization: `Bearer ${config.DIRECTUS_TOKEN}`,
      },
    });

    if (!itemRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch hero' }, { status: itemRes.status });
    }

    const data: DirectusHeroResponse = await itemRes.json();
    
    // Verifica se existe hero_image nos dados
    if (!data.data?.hero_image) {
      return NextResponse.json({ error: 'Hero image not found' }, { status: 404 });
    }

    // Usa a função fetchDirectusAsset para retornar a imagem
    return await fetchDirectusAsset(data.data.hero_image, context);
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
