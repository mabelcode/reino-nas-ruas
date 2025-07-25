import { NextResponse } from 'next/server';
import { fetchDirectusAsset } from '@/lib/fetch-directus-asset';

export const runtime = 'edge';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }, context: any) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json(
            { error: 'Asset ID is required' },
            { status: 400 }
        );
    }
    return fetchDirectusAsset(id, context);
}