import { NextResponse } from 'next/server';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: { env?: { DIRECTUS_URL?: string, DIRECTUS_TOKEN?: string } } = {}) {
    const DIRECTUS_URL = context.env?.DIRECTUS_URL || process.env.DIRECTUS_URL;
    const DIRECTUS_TOKEN = context.env?.DIRECTUS_TOKEN || process.env.DIRECTUS_TOKEN;

    if (!DIRECTUS_URL || !DIRECTUS_TOKEN) {
        return NextResponse.json(
            { error: 'Server misconfiguration' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `${DIRECTUS_URL}/items/financial_reports?fields=*,file.id,file.filesize&sort=-date`,
            {
                headers: {
                    Authorization: `Bearer ${DIRECTUS_TOKEN}`,
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching financial reports:', error);
        return NextResponse.json(
            { error: 'Failed to fetch financial reports' },
            { status: 500 }
        );
    }
} 