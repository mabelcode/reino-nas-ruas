import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export async function GET() {
  if (!DIRECTUS_URL) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  try {
    const res = await fetch(`${DIRECTUS_URL}/items/testimonials`, {
      headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
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
