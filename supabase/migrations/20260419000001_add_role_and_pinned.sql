-- Migration: Add role to community_users and pinned to events
-- =============================================================

-- 1. Create community_role enum
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'community_role') THEN
    CREATE TYPE public.community_role AS ENUM ('member', 'admin');
  END IF;
END
$$;

-- 2. Add role column to community_users (default 'member')
ALTER TABLE public.community_users
  ADD COLUMN IF NOT EXISTS role public.community_role NOT NULL DEFAULT 'member';

-- 3. Add pinned column to events (default false)
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS pinned boolean NOT NULL DEFAULT false;

-- 4. Add comment for pg_graphql to pick up the enum
COMMENT ON COLUMN public.community_users.role IS 'The role of the user within the community (member or admin)';
COMMENT ON COLUMN public.events.pinned IS 'Whether the event is pinned to the top of the list';
