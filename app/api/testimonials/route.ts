import { NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';

export const runtime = 'edge';

export async function GET(request: Request, context: any) {
  const { DIRECTUS_URL, DIRECTUS_TOKEN } = getEnv(context);

  try {
    const res = await fetch(`${DIRECTUS_URL}/items/testimonials`, {
      headers: DIRECTUS_TOKEN ? { Authorization: `Bearer ${DIRECTUS_TOKEN}` } : {},
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Erro ao buscar do Directus:', res.status, errorText);
      return NextResponse.json(
        { error: 'Failed to fetch testimonials', status: res.status, directus: errorText },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json({ data: data.data }, { status: 200 });
  } catch (err) {
    console.error('Erro inesperado:', err);
    return NextResponse.json({ error: 'Unexpected error', err: String(err) }, { status: 500 });
  }
}
