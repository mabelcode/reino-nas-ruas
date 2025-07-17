import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 1209600; // 2 weeks

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

interface Transaction {
  type: string;
  amount: string;
  date: string;
}

export async function GET() {
  if (!DIRECTUS_URL || !TOKEN) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const url = `${DIRECTUS_URL}/items/transactions?fields=type,amount,date&limit=-1`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate },
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: res.status });
  }

  const json = await res.json();
  const transactions: Transaction[] = json.data || [];

  const summary: Record<string, { total_received: number; total_spent: number }> = {};

  for (const t of transactions) {
    if (!t.date) continue;
    const year = new Date(t.date).getFullYear().toString();
    const amount = parseFloat(t.amount);
    const type = (t.type || '').toLowerCase();
    if (!summary[year]) summary[year] = { total_received: 0, total_spent: 0 };
    if (type === 'in' || type === 'entrada') {
      summary[year].total_received += amount;
    } else if (type === 'out' || type === 'saida') {
      summary[year].total_spent += amount;
    }
  }

  return NextResponse.json(
    { data: summary },
    {
      status: 200,
      headers: { 'Cache-Control': `public, max-age=${revalidate}` },
    }
  );
}
