-- ════════════════════════════════════════════════════════════════════════════
-- ESEIS Pest Control — Migration de correction (2026-09-11)
-- À exécuter manuellement dans Supabase SQL Editor : la base de prod est déjà
-- seedée, donc supabase/seed.sql (INSERT ... ON CONFLICT DO NOTHING) ne suffit
-- pas à corriger les lignes déjà en place. Ce script les met à jour.
-- ════════════════════════════════════════════════════════════════════════════

-- ─── 1. Chiffre "secteurs d'activité couverts" — était figé à 12, en réalité 6
--        (7 après l'ajout du secteur Bureaux ci-dessous) ─────────────────────
update stats set value = '7' where label = 'Secteurs d''activité couverts';

-- ─── 2. Nouveau secteur : Bureaux & tertiaire ─────────────────────────────────
insert into sectors (slug, title, badge, icon, description, services, challenges, sort_order) values
('bureaux', 'Bureaux & tertiaire', 'Professionnels', 'Building2',
  'Sièges sociaux, plateaux de bureaux, espaces partagés : interventions discrètes, en dehors des heures de présence.',
  array['deratisation','desinsectisation','volants','prevention'],
  array['Continuité d''activité pendant l''intervention','Discrétion vis-à-vis des collaborateurs et visiteurs','Espaces partagés et zones de restauration collective','Interventions hors horaires de bureau si besoin'], 7)
on conflict (slug) do nothing;

-- ─── 3. Réordonner Nuisibles volants avant Désinfection + retirer
--        "en milieu professionnel" de la description des Nuisibles volants ───
update services set index = '04', sort_order = 4,
  description = 'Gestion des guêpes, frelons (dont frelon asiatique), mouches et moustiques.'
  where slug = 'volants';
update services set index = '05', sort_order = 5
  where slug = 'desinfection';

-- ─── 4. Bug préexistant : "Prévention & audit" et "Dépigeonnage" partagent
--        tous les deux l'index 06 en prod (doublon visible sur la page
--        d'accueil) — non lié aux changements ci-dessus ────────────────────
update services set index = '07', sort_order = 7
  where slug = 'prevention';
