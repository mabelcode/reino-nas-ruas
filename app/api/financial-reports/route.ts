import { NextResponse } from 'next/server';
import { getEnv } from '@/lib/env';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: any) {
    const { DIRECTUS_URL, DIRECTUS_TOKEN } = getEnv(context);

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