/**
 * Busca um asset do Directus e retorna uma resposta HTTP adequada.
 * Centraliza autenticação, headers e cache para assets.
 * @param id - ID do asset no Directus
 * @param context - Contexto da rota (Edge/Server), pode conter variáveis de ambiente
 * @returns Response com a imagem ou NextResponse com erro
 */
import { NextResponse } from 'next/server';
import { getDirectusConfig } from './utils';

export async function fetchDirectusAsset(
  id: string,
  context: Record<string, any>
): Promise<Response | NextResponse> {
  const config = getDirectusConfig(context);

  let imageRes: Response;
  try {
    imageRes = await fetch(`${config.DIRECTUS_URL}/assets/${encodeURIComponent(id)}`, {
      headers: {
        Authorization: `Bearer ${config.DIRECTUS_TOKEN}`,
      },
      // Mantém compatibilidade futura para edge/server
      cache: 'force-cache',
      next: { revalidate: 86400 },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch asset' },
      { status: 502 }
    );
  }

  if (!imageRes.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch asset' },
      { status: imageRes.status }
    );
  }

  const contentType = imageRes.headers.get('content-type') ?? 'application/octet-stream';

  return new Response(imageRes.body, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
} 