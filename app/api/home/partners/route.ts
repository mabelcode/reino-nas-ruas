import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

interface Partner {
    id: string;
    name: string;
    logo: string;
    website: string;
    category: string;
    date_created: string;
    date_updated: string | null;
}

export const revalidate = 86400;

export async function GET(request: Request, context: any) {
    const DIRECTUS_URL = context?.env?.DIRECTUS_URL || process.env.DIRECTUS_URL;
    const DIRECTUS_TOKEN = context?.env?.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;

    if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
        return NextResponse.json(
            { error: 'Server misconfiguration' },
            { status: 500 }
        );
    }

    const partnersRes = await fetch(`${DIRECTUS_URL}/items/partners`, {
        headers: {
            Authorization: `Bearer ${DIRECTUS_TOKEN}`,
        },
        next: { revalidate },
    });

    if (!partnersRes.ok) {
        return NextResponse.json(
            { error: 'Failed to fetch partners' },
            { status: partnersRes.status }
        );
    }

    const partners: Partner[] = (await partnersRes.json()).data;

    return NextResponse.json({ data: partners },
        {
            status: 200,
            headers: {
                'Cache-Control': `public, max-age=${revalidate}`,
            },
        });
}