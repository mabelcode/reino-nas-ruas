import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export const revalidate = 0;

export async function GET(req: Request) {
  if (!DIRECTUS_URL) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') ?? '0';
  const limit = searchParams.get('limit') ?? '6';

  let url = `${DIRECTUS_URL}/items/events?fields=*,related_projects.projects_id,filter_tags.event_tags_id,gallery.directus_files_id&limit=${limit}&page=${page}&meta=total_count`;

  const res = await fetch(url, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: res.status },
    );
  }

  const data = await res.json();

  return NextResponse.json(
    { data: data.data, meta: data.meta },
    {
      status: 200,
      headers: {
        'Cache-Control': `public, max-age=${revalidate}`,
      },
    },
  );
}
