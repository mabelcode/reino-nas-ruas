import { NextResponse } from 'next/server';

export const revalidate = 1209600;

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!DIRECTUS_URL || !params.id) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const url = `${DIRECTUS_URL}/assets/${params.id}`;
  const res = await fetch(url, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to download file' }, { status: res.status });
  }

  const blob = await res.blob();
  const headers = new Headers({
    'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
    'Content-Disposition': res.headers.get('Content-Disposition') || 'attachment',
    'Cache-Control': `public, max-age=${revalidate}`,
  });

  return new NextResponse(blob, { status: 200, headers });
}
