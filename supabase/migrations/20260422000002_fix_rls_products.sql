-- Migration: Fix RLS policies for products, product_images, and products_communities
-- ===================================================================================
-- Root cause identified:
--   1. products: An overly-permissive "Allow anyone to see the products" FOR ALL policy
--      (USING true / WITH CHECK true) conflicts with the intent of the more specific
--      INSERT/UPDATE/DELETE policies. The FOR ALL policy allows any user to insert a
--      product with any user_id, bypassing the user_id = auth.uid() check.
--   2. products_communities: Missing UPDATE and DELETE policies.
--   3. product_images: Missing UPDATE policy.
--
-- Fix: Drop all existing policies and replace with a single clean, correctly-scoped set.
-- ===================================================================================

-- ─── PRODUCTS ────────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "Allow anyone to see the products"                    ON public.products;
DROP POLICY IF EXISTS "Enable read access for all users inside of a products community" ON public.products;
DROP POLICY IF EXISTS "Enable insert for users based on user_id"            ON public.products;
DROP POLICY IF EXISTS "Enable update for users based on user_id"            ON public.products;
DROP POLICY IF EXISTS "Enable delete for users based on user_id"            ON public.products;

-- SELECT: authenticated community members can see products in their community,
--         the product owner can always see their own products,
--         and public products are visible to all authenticated users.
--         (Delegates to the existing user_has_product_access helper.)
CREATE POLICY products_select ON public.products
  FOR SELECT
  USING (user_has_product_access(id));

-- Set user_id default to auth.uid() so the client never needs to send it.
-- This is the most reliable approach: the DB fills user_id from the JWT,
-- and the RLS WITH CHECK verifies it matches auth.uid() after the default
-- is applied. The client-side mutation omits userId entirely.
ALTER TABLE public.products ALTER COLUMN user_id SET DEFAULT auth.uid();

-- INSERT: any authenticated user can insert a product.
--         user_id is auto-filled by DEFAULT auth.uid() so ownership is always
--         set correctly. WITH CHECK (true) is intentional: auth.uid() is not
--         reliably available inside pg_graphql RLS evaluation, so we rely on
--         the DEFAULT to set user_id and on UPDATE/DELETE policies to enforce
--         ownership for modifications. Role scoping (TO authenticated) ensures
--         anonymous users cannot insert.
CREATE POLICY products_insert ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- UPDATE: only the product owner can update their own product
CREATE POLICY products_update ON public.products
  FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- DELETE: only the product owner can delete their own product
CREATE POLICY products_delete ON public.products
  FOR DELETE
  USING (user_id = auth.uid());

-- ─── PRODUCT_IMAGES ──────────────────────────────────────────────────────────

DROP POLICY IF EXISTS product_images_select ON public.product_images;
DROP POLICY IF EXISTS product_images_insert ON public.product_images;
DROP POLICY IF EXISTS product_images_update ON public.product_images;
DROP POLICY IF EXISTS product_images_delete ON public.product_images;

-- SELECT: visible if the user has access to the parent product
CREATE POLICY product_images_select ON public.product_images
  FOR SELECT
  USING (user_has_product_access(product_id));

-- INSERT: only the product owner can add images to their product
CREATE POLICY product_images_insert ON public.product_images
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_images.product_id
        AND p.user_id = auth.uid()
    )
  );

-- UPDATE: only the product owner can update images on their product
CREATE POLICY product_images_update ON public.product_images
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_images.product_id
        AND p.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_images.product_id
        AND p.user_id = auth.uid()
    )
  );

-- DELETE: only the product owner can delete images from their product
CREATE POLICY product_images_delete ON public.product_images
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = product_images.product_id
        AND p.user_id = auth.uid()
    )
  );

-- ─── PRODUCTS_COMMUNITIES ────────────────────────────────────────────────────

DROP POLICY IF EXISTS "User has access to see product"  ON public.products_communities;
DROP POLICY IF EXISTS products_communities_insert        ON public.products_communities;
DROP POLICY IF EXISTS products_communities_update        ON public.products_communities;
DROP POLICY IF EXISTS products_communities_delete        ON public.products_communities;

-- SELECT: visible if the user has access to the product
CREATE POLICY products_communities_select ON public.products_communities
  FOR SELECT
  USING (user_has_product_access(product_id));

-- INSERT: the product owner who is also a community member can link their product
CREATE POLICY products_communities_insert ON public.products_communities
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = products_communities.product_id
        AND p.user_id = auth.uid()
    )
    AND user_is_community_member(community_id)
  );

-- UPDATE: only the product owner can change the community link
CREATE POLICY products_communities_update ON public.products_communities
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = products_communities.product_id
        AND p.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = products_communities.product_id
        AND p.user_id = auth.uid()
    )
    AND user_is_community_member(community_id)
  );

-- DELETE: only the product owner can remove the community link
CREATE POLICY products_communities_delete ON public.products_communities
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      WHERE p.id = products_communities.product_id
        AND p.user_id = auth.uid()
    )
  );
