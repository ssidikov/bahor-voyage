import crypto from 'crypto';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function secretsEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return crypto.timingSafeEqual(aBuf, bBuf);
}

type SanityWebhookPayload = {
  _type?: string;
  slug?: { current?: string } | string;
  document?: { slug?: { current?: string } | string };
};

export async function POST(req: Request) {
  const url = new URL(req.url);

  const expectedSecret = process.env.SANITY_WEBHOOK_SECRET;
  if (!expectedSecret) {
    return NextResponse.json(
      { error: 'SANITY_WEBHOOK_SECRET is not configured' },
      { status: 500 },
    );
  }

  const providedSecret = url.searchParams.get('secret') ?? '';
  if (!providedSecret || !secretsEqual(providedSecret, expectedSecret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let payload: SanityWebhookPayload | null = null;
  try {
    payload = (await req.json()) as SanityWebhookPayload;
  } catch {
    payload = null;
  }

  const rawSlug =
    payload?.slug ??
    payload?.document?.slug ??
    // Some webhook configurations send the full document as the body
    (payload as unknown as { slug?: { current?: string } | string } | null)
      ?.slug;

  const slug =
    typeof rawSlug === 'string'
      ? rawSlug
      : rawSlug && typeof rawSlug === 'object'
        ? rawSlug.current
        : undefined;

  const paths = new Set<string>(['/blog', '/en/blog', '/sitemap.xml']);
  if (slug) {
    paths.add(`/blog/${slug}`);
    paths.add(`/en/blog/${slug}`);
  }

  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ revalidated: [...paths], slug });
}
