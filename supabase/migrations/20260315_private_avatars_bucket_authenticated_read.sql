-- Migration: private_avatars_bucket_authenticated_read
-- Date: 2026-03-15
--
-- Changes:
--   1. Make the avatars bucket private (was public).
--      Previously, any unauthenticated request could read avatar images directly
--      via the public storage URL. Setting public = false forces all reads through
--      RLS policies, so only authenticated users can access avatars.
--
--   2. Drop the old SELECT policy "Avatar images are publicly accessible."
--      This policy was misleadingly named and relied on the bucket being public.
--
--   3. Add a new SELECT policy "Authenticated users can view avatars" that
--      explicitly grants SELECT on storage.objects to the authenticated role
--      for the avatars bucket.
--
--   4. The existing INSERT policy "Anyone can upload an avatar." (restricted to
--      the authenticated role) is left intact — no changes to upload behaviour.

-- 1. Make the avatars bucket private
UPDATE storage.buckets
SET public = false
WHERE id = 'avatars';

-- 2. Drop the old public-access SELECT policy
DROP POLICY IF EXISTS "Avatar images are publicly accessible." ON storage.objects;

-- 3. Add authenticated-only SELECT policy
CREATE POLICY "Authenticated users can view avatars"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'avatars');
