import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 1209600;

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

interface Transaction {
  type: string;
  amount: string;
  date: string;
  projects: number[] | null;
}

interface Project {
  id: number;
  title: string;
}

export async function GET(req: Request) {
  if (!DIRECTUS_URL || !TOKEN) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year');
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const limit = parseInt(searchParams.get('limit') ?? '4', 10);

  let url = `${DIRECTUS_URL}/items/transactions?fields=type,amount,date,projects&limit=-1`;
  if (year) {
    url += `&filter[date][_between]=${year}-01-01,${year}-12-31`;
  }

  const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` }, next: { revalidate } });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: res.status });
  }

  const json = await res.json();
  const transactions: Transaction[] = json.data || [];

  const totals: Record<number, { received: number; spent: number }> = {};

  for (const t of transactions) {
    if (!t.projects || !t.projects.length) continue;
    const amount = parseFloat(t.amount);
    const isIn = (t.type || '').toLowerCase() === 'in' || (t.type || '').toLowerCase() === 'entrada';
    for (const id of t.projects) {
      if (!totals[id]) totals[id] = { received: 0, spent: 0 };
      if (isIn) {
        totals[id].received += amount;
      } else {
        totals[id].spent += amount;
      }
    }
  }

  const projectIds = Object.keys(totals);
  if (!projectIds.length) {
    return NextResponse.json({ data: [], meta: { total_pages: 0, total_count: 0 } }, { status: 200 });
  }

  const projectsRes = await fetch(`${DIRECTUS_URL}/items/projects?fields=id,title&filter[id][_in]=${projectIds.join(',')}`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    next: { revalidate },
  });

  if (!projectsRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: projectsRes.status });
  }

  const projectsJson = await projectsRes.json();
  const projects: Project[] = projectsJson.data || [];

  const items = projects.map((p) => ({
    id: p.id,
    title: p.title,
    ...totals[p.id],
  }));

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const start = (page - 1) * limit;
  const paged = items.slice(start, start + limit);

  return NextResponse.json(
    { data: paged, meta: { total_pages: totalPages, total_count: totalItems } },
    { status: 200, headers: { 'Cache-Control': `public, max-age=${revalidate}` } }
  );
}
