import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { ContactPayload, ONGInfo, orgEmailHtml, userEmailHtml } from '@/lib/emailTemplates';

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const TOKEN = process.env.DIRECTUS_TOKEN;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '465', 10);
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function POST(req: Request) {
  if (!DIRECTUS_URL || !TOKEN || !SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!payload.name || !payload.email || !payload.phone || !payload.subject || !payload.message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const infoRes = await fetch(`${DIRECTUS_URL}/items/infos`, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!infoRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch info' }, { status: 500 });
    }

    const infoData = await infoRes.json();
    const info = infoData.data as ONGInfo;

    const recipients = [info.email];
    if (info.email_2) recipients.push(info.email_2);

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    await transporter.sendMail({
      from: `${payload.name} <${payload.email}>`,
      to: recipients.join(', '),
      subject: `${payload.subject} - Contato pelo site`,
      html: orgEmailHtml(info, payload, BASE_URL),
    });

    await transporter.sendMail({
      from: `Associação Reino nas Ruas <${info.email}>`,
      to: payload.email,
      subject: `Cópia do seu contato`,
      html: userEmailHtml(info, payload, BASE_URL),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
