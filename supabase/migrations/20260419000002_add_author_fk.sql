-- Migration: Add foreign key from events.created_by and notices.created_by to profiles.id
-- This enables pg_graphql to expose the author (Profiles) relation on Events and Notices.
-- =============================================================

-- 1. Add FK from events.created_by -> profiles.id
ALTER TABLE public.events
  ADD CONSTRAINT events_created_by_profiles_fkey
  FOREIGN KEY (created_by) REFERENCES public.profiles(id);

-- 2. Add FK from notices.created_by -> profiles.id
ALTER TABLE public.notices
  ADD CONSTRAINT notices_created_by_profiles_fkey
  FOREIGN KEY (created_by) REFERENCES public.profiles(id);
