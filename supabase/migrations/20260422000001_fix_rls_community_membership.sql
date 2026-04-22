-- Migration: Fix and consolidate RLS policies for events, event_rsvps, and notices
-- =================================================================================
-- Goals:
--   1. Only authenticated community members can SELECT events/notices for their community.
--   2. Only authenticated community members can INSERT events/notices into their community.
--   3. Only the creator can UPDATE or DELETE their own event/notice.
--   4. Only authenticated community members can INSERT/UPDATE/DELETE event_rsvps.
--   5. Remove all duplicate policies introduced by earlier migrations.
--
-- The helper function user_is_community_member(p_community_id bigint) already exists
-- and returns TRUE when auth.uid() has an accepted row in community_users for that community.
-- =================================================================================

-- ─── EVENTS ──────────────────────────────────────────────────────────────────

-- Drop all existing events policies (both originals and the _own duplicates from
-- migration 20260419000003) so we can replace them with a single clean set.
DROP POLICY IF EXISTS events_select       ON public.events;
DROP POLICY IF EXISTS events_insert       ON public.events;
DROP POLICY IF EXISTS events_update       ON public.events;
DROP POLICY IF EXISTS events_update_own   ON public.events;
DROP POLICY IF EXISTS events_delete       ON public.events;
DROP POLICY IF EXISTS events_delete_own   ON public.events;

-- SELECT: only community members can see events for their community
CREATE POLICY events_select ON public.events
  FOR SELECT
  USING (user_is_community_member(community_id));

-- INSERT: only community members can create events; created_by must be the caller
CREATE POLICY events_insert ON public.events
  FOR INSERT
  WITH CHECK (
    created_by = auth.uid()
    AND user_is_community_member(community_id)
  );

-- UPDATE: only the creator (who is also a community member) can edit their event
CREATE POLICY events_update ON public.events
  FOR UPDATE
  USING (
    created_by = auth.uid()
    AND user_is_community_member(community_id)
  )
  WITH CHECK (
    created_by = auth.uid()
    AND user_is_community_member(community_id)
  );

-- DELETE: only the creator (who is also a community member) can delete their event
CREATE POLICY events_delete ON public.events
  FOR DELETE
  USING (
    created_by = auth.uid()
    AND user_is_community_member(community_id)
  );

-- ─── EVENT_RSVPS ─────────────────────────────────────────────────────────────

-- Drop all existing event_rsvps policies
DROP POLICY IF EXISTS event_rsvps_select ON public.event_rsvps;
DROP POLICY IF EXISTS event_rsvps_insert ON public.event_rsvps;
DROP POLICY IF EXISTS event_rsvps_update ON public.event_rsvps;
DROP POLICY IF EXISTS event_rsvps_delete ON public.event_rsvps;

-- SELECT: only community members can see RSVPs for events in their community
CREATE POLICY event_rsvps_select ON public.event_rsvps
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_rsvps.event_id
        AND user_is_community_member(e.community_id)
    )
  );

-- INSERT: only community members can RSVP to events in their community;
--         user_id must be the caller
CREATE POLICY event_rsvps_insert ON public.event_rsvps
  FOR INSERT
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_rsvps.event_id
        AND user_is_community_member(e.community_id)
    )
  );

-- UPDATE: only the RSVP owner (who is also a community member) can change their RSVP
CREATE POLICY event_rsvps_update ON public.event_rsvps
  FOR UPDATE
  USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_rsvps.event_id
        AND user_is_community_member(e.community_id)
    )
  )
  WITH CHECK (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_rsvps.event_id
        AND user_is_community_member(e.community_id)
    )
  );

-- DELETE: only the RSVP owner (who is also a community member) can remove their RSVP
CREATE POLICY event_rsvps_delete ON public.event_rsvps
  FOR DELETE
  USING (
    user_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.events e
      WHERE e.id = event_rsvps.event_id
        AND user_is_community_member(e.community_id)
    )
  );

-- ─── NOTICES ─────────────────────────────────────────────────────────────────

-- Drop all existing notices policies (both originals and the _own duplicates)
DROP POLICY IF EXISTS notices_select      ON public.notices;
DROP POLICY IF EXISTS notices_insert      ON public.notices;
DROP POLICY IF EXISTS notices_update      ON public.notices;
DROP POLICY IF EXISTS notices_update_own  ON public.notices;
DROP POLICY IF EXISTS notices_delete      ON public.notices;
DROP POLICY IF EXISTS notices_delete_own  ON public.notices;

-- SELECT: only community members can see notices for their community
CREATE POLICY notices_select ON public.notices
  FOR SELECT
  USING (user_is_community_member(community_id));

-- INSERT: only community members can post notices; created_by must be the caller
CREATE POLICY notices_insert ON public.notices
  FOR INSERT
  WITH CHECK (
    created_by = auth.uid()
    AND user_is_community_member(community_id)
  );

-- UPDATE: only the creator (who is also a community member) can edit their notice
CREATE POLICY notices_update ON public.notices
  FOR UPDATE
  USING (
    created_by = auth.uid()
    AND user_is_community_member(community_id)
  )
  WITH CHECK (
    created_by = auth.uid()
    AND user_is_community_member(community_id)
  );

-- DELETE: only the creator (who is also a community member) can delete their notice
CREATE POLICY notices_delete ON public.notices
  FOR DELETE
  USING (
    created_by = auth.uid()
    AND user_is_community_member(community_id)
  );
