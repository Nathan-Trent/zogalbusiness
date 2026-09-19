import { createClient } from '@supabase/supabase-js'
import { defaultsFor, type PageSchema } from './content-schema'

/**
 * Live copy from site_content, field by field over the schema defaults.
 * If the table is empty or unreachable the page still reads exactly as it
 * did before the back office existed. Revalidated every minute and on
 * publish (/api/revalidate).
 */
export type Content = Record<string, unknown>

export async function getContent(schema: PageSchema): Promise<Content> {
  const base = defaultsFor(schema)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL, key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return base
  try {
    const db = createClient(url, key, { auth: { persistSession: false } })
    const { data, error } = await db.from('site_content').select('key, value').eq('page', schema.page)
    if (error || !data) return base
    for (const r of data) if (r.key in base && r.value !== null && r.value !== '') base[r.key as string] = r.value
    return base
  } catch { return base }
}

/** Typed readers. Wrong shape in the table → the default, never a crash. */
export const str = (c: Content, k: string, d = ''): string => (typeof c[k] === 'string' ? (c[k] as string) : d)
export const strs = (c: Content, k: string): string[] => (Array.isArray(c[k]) ? (c[k] as unknown[]).filter((x): x is string => typeof x === 'string') : [])
export const pairs = (c: Content, k: string): [string, string][] => (Array.isArray(c[k]) ? (c[k] as unknown[]).filter((x): x is [string, string] => Array.isArray(x) && x.length >= 2) : [])
export const rows3 = (c: Content, k: string): [string, string, string][] => (Array.isArray(c[k]) ? (c[k] as unknown[]).filter((x): x is [string, string, string] => Array.isArray(x) && x.length >= 3) : [])
