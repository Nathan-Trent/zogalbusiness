import { createClient } from '@supabase/supabase-js'

/** Mirrors public.pricing_plans in the Doka project (migration 0015). Public read, anon key. */
export interface PricingPlan {
  id: string
  key: string
  name: string
  tagline: string | null
  price_monthly: number | string
  price_yearly: number | string | null
  currency: string
  features: string[]
  limits: Record<string, number | null>
  highlight: boolean
  sort_order: number
}

export async function fetchPricing(): Promise<PricingPlan[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return []
  try {
    const db = createClient(url, key, { auth: { persistSession: false } })
    const { data, error } = await db.from('pricing_plans').select('*').eq('product', 'doka').eq('is_visible', true).order('sort_order')
    return error ? [] : (data as PricingPlan[])
  } catch {
    return []
  }
}
