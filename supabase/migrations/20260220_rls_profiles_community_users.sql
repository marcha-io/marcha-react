-- =============================================================================
-- RLS Migration: Restrict profile & community_users access to the logged-in user
-- =============================================================================
-- Run this in the Supabase SQL Editor or via `supabase db push`.
--
-- After applying, each authenticated user can only SELECT their own rows.
-- A "super_admin" role (stored in the JWT custom claim `role`) can read all rows.
-- =============================================================================

-- ─── profiles ────────────────────────────────────────────────────────────────

-- 1. Enable RLS (idempotent — safe to run if already enabled)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing SELECT policies if they exist so this migration is re-runnable
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Super admins can view all profiles" ON profiles;

-- 3. Users can read only their own profile row
--    profiles.id is the same UUID as auth.uid() (set by the trigger on auth.users)
CREATE POLICY "Users can view own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 4. Super admins can read any profile
--    This checks the `role` claim inside the JWT. To use this, set a custom claim
--    on the user's JWT via Supabase Auth hooks or the admin API:
--      { "role": "super_admin" }
--    If you use a different mechanism (e.g. a user_roles table), replace the
--    USING clause accordingly.
CREATE POLICY "Super admins can view all profiles"
  ON profiles
  FOR SELECT
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'super_admin'
  );


-- ─── community_users ────────────────────────────────────────────────────────

-- 1. Enable RLS
ALTER TABLE community_users ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing SELECT policies
DROP POLICY IF EXISTS "Users can view own community memberships" ON community_users;
DROP POLICY IF EXISTS "Super admins can view all community memberships" ON community_users;

-- 3. Users can only see their own community memberships
CREATE POLICY "Users can view own community memberships"
  ON community_users
  FOR SELECT
  USING (auth.uid() = user_id);

-- 4. Super admins can see all memberships
CREATE POLICY "Super admins can view all community memberships"
  ON community_users
  FOR SELECT
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'super_admin'
  );
