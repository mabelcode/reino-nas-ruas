import { NextRequest, NextResponse } from 'next/server';
import { getDirectusConfig } from '../../../../lib/utils';

export const runtime = 'edge';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
  context: any
) {
  const { id } = await params;
  const config = getDirectusConfig(context);

  try {
    const res = await fetch(`${config.DIRECTUS_URL}/items/events/${id}?fields=*,related_projects.projects_id,filter_tags.event_tags_id,gallery.directus_files_id`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${config.DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(await request.json()),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch event' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
