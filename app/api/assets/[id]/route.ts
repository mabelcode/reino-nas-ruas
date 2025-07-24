import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export const revalidate = 0;

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!DIRECTUS_URL || !TOKEN) {
        return NextResponse.json(
            { error: 'Server misconfiguration' },
            { status: 500 }
        );
    }

    const { id } = await params;
    if (!id) {
        return NextResponse.json(
            { error: 'Asset ID is required' },
            { status: 400 }
        );
    }

    const imageRes = await fetch(`${DIRECTUS_URL}/assets/${id}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
        next: { revalidate },
    });

    if (!imageRes.ok) {
        return NextResponse.json(
            { error: 'Failed to fetch asset' },
            { status: imageRes.status }
        );
    }

    const contentType = imageRes.headers.get('content-type') || 'application/octet-stream';

    return new Response(imageRes.body, {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': `public, max-age=${revalidate}`,
        },
    });
}