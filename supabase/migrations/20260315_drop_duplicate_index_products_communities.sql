-- Migration: drop_duplicate_index_products_communities
-- Date: 2026-03-15
--
-- Issue:
--   The products_communities table had two identical indexes on the id column:
--     - products_communities_pkey  (primary key constraint, btree on id)
--     - products_communities_id_key (unique constraint, btree on id)
--   Both were CREATE UNIQUE INDEX ... USING btree (id), making one completely
--   redundant. Supabase flagged this as a performance advisory warning.
--
-- Fix:
--   Drop the redundant unique constraint products_communities_id_key.
--   The primary key (products_communities_pkey) already enforces uniqueness
--   and non-nullability on the id column, so no data integrity is lost.

ALTER TABLE public.products_communities DROP CONSTRAINT IF EXISTS products_communities_id_key;
