import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Singleton browser/server client (lecture publique)
export const supabase = url && anon ? createClient(url, anon) : null;

// Client service-role pour les API routes (écriture, bypass RLS)
export function createServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey);
}

export const supabaseConfigured = !!(url && anon);
