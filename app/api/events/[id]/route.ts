import { NextResponse } from 'next/server';

export const runtime = 'edge';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!DIRECTUS_URL || !TOKEN) {
    return NextResponse.json(
      { error: 'Server misconfiguration' },
      { status: 500 },
    );
  }

  const { id } = await params;
  const body = await req.json();

  const res = await fetch(`${DIRECTUS_URL}/items/events/${id}?fields=*,related_projects.projects_id,filter_tags.event_tags_id,gallery.directus_files_id`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: res.status },
    );
  }

  const data = await res.json();

  return NextResponse.json({ data: data.data }, { status: 200 });
}
