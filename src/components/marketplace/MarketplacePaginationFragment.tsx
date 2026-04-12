import graphql from 'babel-plugin-relay/macro';

/**
 * Relay pagination fragment for the marketplace product list.
 *
 * Queries `productsCollection` directly so that all product-level filters
 * (name search, category, condition) can be applied server-side via
 * Supabase's pg_graphql `ProductsFilter` input type.
 *
 * Community scoping is enforced by:
 *   1. The RLS policy `user_has_product_access` which limits rows to products
 *      the authenticated user can see (same-community products + own products
 *      + public products).
 *   2. The `isPublic` filter variable (always `true`) so only active listings
 *      are shown in the browse view.
 *
 * Filter variables forwarded from the parent query:
 *   - `$search`     → `name: { ilike: "%<term>%" }` (case-insensitive)
 *   - `$categoryId` → `categoryId: { eq: "<uuid>" }`
 *   - `$condition`  → `condition: { eq: <ProductCondition> }`
 *
 * @refetchable generates `MarketplacePaginationQuery` automatically.
 * @connection tells Relay to merge paginated edges under a stable key so
 * `usePaginationFragment` can append new pages to the existing list.
 * @argumentDefinitions declares the variables forwarded from the parent query.
 */
export const marketplacePaginationFragment = graphql`
  fragment MarketplacePaginationFragment on Query
  @refetchable(queryName: "MarketplacePaginationQuery")
  @argumentDefinitions(
    count: { type: "Int", defaultValue: 12 }
    cursor: { type: "Cursor" }
    filter: { type: "ProductsFilter" }
    orderBy: { type: "[ProductsOrderBy!]" }
  ) {
    productsCollection(
      first: $count
      after: $cursor
      filter: $filter
      orderBy: $orderBy
    ) @connection(key: "Marketplace_productsCollection") {
      edges {
        node {
          ...ProductCardFragmentQuery
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
