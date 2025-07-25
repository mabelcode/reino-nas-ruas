import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export const revalidate = 0;

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }, context: any) {
    const DIRECTUS_URL = context?.env?.DIRECTUS_URL || process.env.DIRECTUS_URL;
    const DIRECTUS_TOKEN = context?.env?.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;

    if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
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
            Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        },
        // next: { revalidate }, // Remover pois não é usado para cache de imagens
    });

    if (!imageRes.ok) {
        return NextResponse.json(
            { error: 'Failed to fetch asset' },
            { status: imageRes.status }
        );
    }

    const contentType = imageRes.headers.get('content-type') || 'application/octet-stream';

    // Cache de 1 semana (604800 segundos)
    return new Response(imageRes.body, {
        headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=604800, immutable',
        },
    });
}