-- Migration: fix_likes_rls_subselect_auth_uid
-- Date: 2026-03-15
--
-- Issue:
--   The RLS policy "Users can insert their own likes" on public.likes used
--   auth.uid() directly in the WITH CHECK expression:
--
--     WITH CHECK (auth.uid() = user_id)
--
--   Postgres re-evaluates auth.uid() (a volatile function) for every row
--   checked by the policy. Supabase flagged this as a performance advisory
--   warning because it prevents the planner from optimising the check.
--
-- Fix:
--   Wrap auth.uid() in a subselect — (SELECT auth.uid()) — so it is
--   evaluated once per statement rather than once per row. This is the
--   recommended Supabase pattern for all auth.<function>() calls in RLS.
--
-- Other policies on public.likes reviewed:
--   - "Enable delete for users based on user_id" (DELETE): already uses
--     (SELECT auth.uid() AS uid) — no change needed.
--   - "Anyone can read likes" (SELECT): uses literal `true` — no change needed.

DROP POLICY IF EXISTS "Users can insert their own likes" ON public.likes;

CREATE POLICY "Users can insert their own likes"
ON public.likes FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = user_id);
