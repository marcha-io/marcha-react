-- Migration: RLS policies for owner-only update/delete on events and notices
-- =============================================================

-- Events: only the creator can update their own events
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'events_update_own' AND tablename = 'events'
  ) THEN
    CREATE POLICY events_update_own ON public.events
      FOR UPDATE
      USING (created_by = auth.uid())
      WITH CHECK (created_by = auth.uid());
  END IF;
END
$$;

-- Events: only the creator can delete their own events
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'events_delete_own' AND tablename = 'events'
  ) THEN
    CREATE POLICY events_delete_own ON public.events
      FOR DELETE
      USING (created_by = auth.uid());
  END IF;
END
$$;

-- Notices: only the creator can update their own notices
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'notices_update_own' AND tablename = 'notices'
  ) THEN
    CREATE POLICY notices_update_own ON public.notices
      FOR UPDATE
      USING (created_by = auth.uid())
      WITH CHECK (created_by = auth.uid());
  END IF;
END
$$;

-- Notices: only the creator can delete their own notices
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'notices_delete_own' AND tablename = 'notices'
  ) THEN
    CREATE POLICY notices_delete_own ON public.notices
      FOR DELETE
      USING (created_by = auth.uid());
  END IF;
END
$$;

-- Admin-only pinning is enforced at the application layer (UI hides pin toggle for non-admins).
-- Optionally, a CHECK constraint or trigger could enforce this at the DB level,
-- but the current approach keeps it simple and consistent with the existing patterns.
