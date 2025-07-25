import { NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';

export const runtime = 'edge';

const { DIRECTUS_URL, DIRECTUS_TOKEN: TOKEN } = getEnv();

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') ?? '0';
  const limit = searchParams.get('limit') ?? '6';
  const upcoming = searchParams.get('upcoming') === 'true';

  let url = `${DIRECTUS_URL}/items/events?fields=*,related_projects.projects_id,filter_tags.event_tags_id,gallery.directus_files_id&limit=${limit}&page=${page}&meta=total_count`;

  if (upcoming) {
    const today = new Date().toLocaleDateString('sv-SE', {
      timeZone: 'America/Sao_Paulo',
    });
    url += `&filter[date][_gte]=${today}&sort=date`;
  }

  const res = await fetch(url, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
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
    },
  );
}
