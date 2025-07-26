import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../lib/utils';

export const runtime = 'edge';

export async function GET(request: NextRequest, context: any) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || '10';
  const page = searchParams.get('page') || '1';

  const config = getDirectusConfig(context);

  let url = `${config.DIRECTUS_URL}/items/events?fields=*,related_projects.projects_id,filter_tags.event_tags_id,gallery.directus_files_id&limit=${limit}&page=${page}&meta=total_count`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${config.DIRECTUS_TOKEN}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
