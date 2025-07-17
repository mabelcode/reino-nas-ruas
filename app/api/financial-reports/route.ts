import { NextResponse } from 'next/server';

export const revalidate = 1209600;

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;

export async function GET(req: Request) {
  if (!DIRECTUS_URL) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '4';
  const year = searchParams.get('year');

  let url = `${DIRECTUS_URL}/items/financial_reports?fields=*,file.id,file.filesize&sort=-date&limit=${limit}&page=${page}&meta=total_count`;

  if (year) {
    url += `&filter[date][_between]=${year}-01-01,${year}-12-31`;
  }

  const res = await fetch(url, {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch financial reports' }, { status: res.status });
  }

  const data = await res.json();

  return NextResponse.json({ data: data.data, meta: data.meta }, { status: 200 });
}
