import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export async function GET() {
    if (!DIRECTUS_URL || !TOKEN) {
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
                    Authorization: `Bearer ${TOKEN}`,
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