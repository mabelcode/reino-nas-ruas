import { NextResponse } from 'next/server';

export const revalidate = 1209600;

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

interface Transaction {
  type: string;
  amount: string;
  date: string;
  category?: string;
}

export async function GET(req: Request) {
  if (!DIRECTUS_URL || !TOKEN) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year');

  let url = `${DIRECTUS_URL}/items/transactions?fields=type,amount,date,category&limit=-1`;
  if (year) {
    url += `&filter[date][_between]=${year}-01-01,${year}-12-31`;
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: res.status });
  }

  const json = await res.json();
  const transactions: Transaction[] = json.data || [];

  const totals: Record<string, number> = {};

  for (const t of transactions) {
    if ((t.type || '').toLowerCase() !== 'out' && (t.type || '').toLowerCase() !== 'saida') continue;
    const category = (t.category || 'UNKNOWN').toUpperCase();
    totals[category] = (totals[category] || 0) + parseFloat(t.amount);
  }

  return NextResponse.json(
    { data: totals },
    {
      status: 200,
      headers: { 'Cache-Control': `public, max-age=${revalidate}` },
    }
  );
}
