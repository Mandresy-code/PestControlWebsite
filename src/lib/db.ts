/**
 * Data access layer — toutes les requêtes passent ici.
 * Si Supabase n'est pas configuré (env vars absentes), on tombe
 * sur le contenu statique de content.ts.
 */
import { supabase, supabaseConfigured } from "./supabase/client";
import * as static_ from "./content";
import type {
  Service, Sector, Pest, Article, MethodStep, Stat, Proof,
} from "./content";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapService(r: Record<string, unknown>): Service {
  return {
    slug:            String(r.slug),
    index:           String(r.index),
    title:           String(r.title),
    shortTitle:      String(r.short_title ?? ""),
    icon:            String(r.icon ?? ""),
    description:     String(r.description ?? ""),
    longDescription: String(r.long_description ?? ""),
    chips:           (r.chips as string[]) ?? [],
    methods:         (r.methods as string[]) ?? [],
    urgent:          Boolean(r.urgent),
  };
}

function mapSector(r: Record<string, unknown>): Sector {
  return {
    slug:        String(r.slug),
    title:       String(r.title),
    badge:       r.badge as "Professionnels" | "Particuliers",
    icon:        String(r.icon ?? ""),
    description: String(r.description ?? ""),
    services:    (r.services as string[]) ?? [],
    challenges:  (r.challenges as string[]) ?? [],
  };
}

function mapPest(r: Record<string, unknown>): Pest {
  return {
    id:          String(r.pest_id),
    name:        String(r.name),
    icon:        String(r.icon ?? ""),
    serviceSlug: String(r.service_slug ?? ""),
    urgent:      Boolean(r.urgent),
    signs:       (r.signs as Record<string, string[]>) ?? {},
  };
}

function mapArticle(r: Record<string, unknown>): Article {
  return {
    slug:     String(r.slug),
    title:    String(r.title),
    excerpt:  String(r.excerpt ?? ""),
    category: String(r.category ?? ""),
    readTime: String(r.read_time ?? ""),
    date:     String(r.date ?? ""),
    body:     r.body ? String(r.body) : undefined,
  };
}

function mapMethodStep(r: Record<string, unknown>): MethodStep {
  return {
    index:       String(r.index),
    title:       String(r.title),
    description: String(r.description ?? ""),
    icon:        String(r.icon ?? ""),
  };
}

function mapStat(r: Record<string, unknown>): Stat {
  return {
    value: String(r.value),
    label: String(r.label),
    mono:  Boolean(r.mono),
  };
}

function mapProof(r: Record<string, unknown>): Proof {
  return {
    icon:        String(r.icon ?? ""),
    title:       String(r.title),
    description: String(r.description ?? ""),
  };
}

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  if (!supabaseConfigured || !supabase) return static_.services;
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("sort_order");
  if (error || !data?.length) return static_.services;
  return (data as Record<string, unknown>[]).map(mapService);
}

export async function getService(slug: string): Promise<Service | undefined> {
  if (!supabaseConfigured || !supabase) {
    return static_.services.find((s) => s.slug === slug);
  }
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return static_.services.find((s) => s.slug === slug);
  return mapService(data as Record<string, unknown>);
}

export async function getServiceSlugs(): Promise<string[]> {
  if (!supabaseConfigured || !supabase) {
    return static_.services.map((s) => s.slug);
  }
  const { data, error } = await supabase
    .from("services")
    .select("slug")
    .order("sort_order");
  if (error || !data?.length) return static_.services.map((s) => s.slug);
  return (data as { slug: string }[]).map((r) => r.slug);
}

// ─── Sectors ──────────────────────────────────────────────────────────────────

export async function getSectors(): Promise<Sector[]> {
  if (!supabaseConfigured || !supabase) return static_.sectors;
  const { data, error } = await supabase
    .from("sectors")
    .select("*")
    .order("sort_order");
  if (error || !data?.length) return static_.sectors;
  return (data as Record<string, unknown>[]).map(mapSector);
}

export async function getSector(slug: string): Promise<Sector | undefined> {
  if (!supabaseConfigured || !supabase) {
    return static_.sectors.find((s) => s.slug === slug);
  }
  const { data, error } = await supabase
    .from("sectors")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return static_.sectors.find((s) => s.slug === slug);
  return mapSector(data as Record<string, unknown>);
}

export async function getSectorSlugs(): Promise<string[]> {
  if (!supabaseConfigured || !supabase) {
    return static_.sectors.map((s) => s.slug);
  }
  const { data, error } = await supabase
    .from("sectors")
    .select("slug")
    .order("sort_order");
  if (error || !data?.length) return static_.sectors.map((s) => s.slug);
  return (data as { slug: string }[]).map((r) => r.slug);
}

// ─── Pests ────────────────────────────────────────────────────────────────────

export async function getPests(): Promise<Pest[]> {
  if (!supabaseConfigured || !supabase) return static_.pests;
  const { data, error } = await supabase
    .from("pests")
    .select("*")
    .order("sort_order");
  if (error || !data?.length) return static_.pests;
  return (data as Record<string, unknown>[]).map(mapPest);
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export async function getArticles(): Promise<Article[]> {
  if (!supabaseConfigured || !supabase) return static_.articles;
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false });
  if (error || !data?.length) return static_.articles;
  return (data as Record<string, unknown>[]).map(mapArticle);
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  if (!supabaseConfigured || !supabase) {
    return static_.articles.find((a) => a.slug === slug);
  }
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  if (error || !data) return static_.articles.find((a) => a.slug === slug);
  return mapArticle(data as Record<string, unknown>);
}

export async function getArticleSlugs(): Promise<string[]> {
  if (!supabaseConfigured || !supabase) {
    return static_.articles.map((a) => a.slug);
  }
  const { data, error } = await supabase
    .from("articles")
    .select("slug")
    .eq("published", true)
    .order("date", { ascending: false });
  if (error || !data?.length) return static_.articles.map((a) => a.slug);
  return (data as { slug: string }[]).map((r) => r.slug);
}

// ─── Method steps ─────────────────────────────────────────────────────────────

export async function getMethodSteps(): Promise<MethodStep[]> {
  if (!supabaseConfigured || !supabase) return static_.methodSteps;
  const { data, error } = await supabase
    .from("method_steps")
    .select("*")
    .order("sort_order");
  if (error || !data?.length) return static_.methodSteps;
  return (data as Record<string, unknown>[]).map(mapMethodStep);
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export async function getStats(): Promise<Stat[]> {
  if (!supabaseConfigured || !supabase) return static_.stats;
  const { data, error } = await supabase
    .from("stats")
    .select("*")
    .order("sort_order");
  if (error || !data?.length) return static_.stats;
  return (data as Record<string, unknown>[]).map(mapStat);
}

// ─── Proofs ───────────────────────────────────────────────────────────────────

export async function getProofs(): Promise<Proof[]> {
  if (!supabaseConfigured || !supabase) return static_.proofs;
  const { data, error } = await supabase
    .from("proofs")
    .select("*")
    .order("sort_order");
  if (error || !data?.length) return static_.proofs;
  return (data as Record<string, unknown>[]).map(mapProof);
}

// ─── Hero video (Supabase Storage) ────────────────────────────────────────────

export function getHeroVideoUrls(): { mp4: string | null; webm: string | null } {
  if (!supabaseConfigured || !supabase) return { mp4: null, webm: null };
  const { data: mp4 }  = supabase.storage.from("media").getPublicUrl("hero/forest.mp4");
  const { data: webm } = supabase.storage.from("media").getPublicUrl("hero/forest.webm");
  return {
    mp4:  mp4.publicUrl  || null,
    webm: webm.publicUrl || null,
  };
}
