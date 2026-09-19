import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

/** The back office calls this after a publish so the page changes now, not within the minute. */
export async function POST(req: Request) {
  const u = new URL(req.url)
  if (!process.env.SITE_REVALIDATE_TOKEN || u.searchParams.get('token') !== process.env.SITE_REVALIDATE_TOKEN) return NextResponse.json({ error: 'no' }, { status: 401 })
  const path = u.searchParams.get('path') ?? '/'
  revalidatePath(path)
  return NextResponse.json({ ok: true, path })
}
