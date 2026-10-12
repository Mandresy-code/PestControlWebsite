-- ════════════════════════════════════════════════════════════════════════════
-- ESEIS Pest Control — Migration (2026-10-12)
-- À exécuter manuellement dans Supabase SQL Editor.
-- Ajoute le champ "adresse" à diagnostic_requests, demandé par Manuel —
-- jusqu'ici seul le code postal était collecté.
-- ════════════════════════════════════════════════════════════════════════════

alter table diagnostic_requests add column if not exists adresse text;
