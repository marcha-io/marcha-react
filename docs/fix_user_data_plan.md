# Fix Plan: Restrict Profile Access & Show Correct User Data

## Problem Summary

1. **RLS (Row Level Security)**: The `profiles` table has no RLS policy restricting
   reads, so any authenticated user can see every profile row via the GraphQL API.
2. **Wrong user data**: All GraphQL queries that fetch `profilesCollection` use
   `first: 1` without a `filter`, so they return the first profile in the table
   (ordered by default), not the logged-in user's profile.  Similarly, the
   `communityUsersCollection` queries do not filter by `userId`, so they may
   return community memberships belonging to other users.

## Root Cause Analysis

### How Supabase auth flows into GraphQL

- `relay_environment.ts` attaches the user's JWT (`session.access_token`) as the
  `Authorization` header on every GraphQL request.
- Supabase's PostgREST/GraphQL layer makes `auth.uid()` available in RLS policies
  based on that JWT.
- **However**, the GraphQL queries themselves do not pass the user's UUID as a
  filter variable — they rely on "first: 1" which returns an arbitrary row.

### Schema key points

| Table            | Key columns                                  | Filter type       |
|------------------|----------------------------------------------|-------------------|
| `profiles`       | `id: UUID!` (= `auth.uid()`)                 | `ProfilesFilter`  |
| `community_users`| `userId: UUID!`, `communityId: BigInt!`       | `CommunityUsersFilter` |

- `ProfilesFilter` has `id: UUIDFilter` — we can filter `{ id: { eq: $userId } }`
- `CommunityUsersFilter` has `userId: UUIDFilter` — we can filter `{ userId: { eq: $userId } }`

## Changes Required

### 1. RLS SQL Migration (`supabase/migrations/rls_profiles.sql`)

```sql
-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Super admins can read any profile (assumes a `role` column or a separate check)
-- Option A: if there's a user_roles table or metadata
CREATE POLICY "Super admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'super_admin'
  );

-- Similarly for community_users
ALTER TABLE community_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own community memberships"
  ON community_users FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Super admins can view all community memberships"
  ON community_users FOR SELECT
  USING (
    auth.jwt() ->> 'role' = 'super_admin'
  );
```

### 2. AuthContext — Expose `userId`

- On session load and `onAuthStateChange`, extract `session.user.id` and store it
  in context as `userId: string | null`.
- All components that need the user ID can call `useAuth()`.

### 3. GraphQL Query Updates

#### CommunityPicker (component + fragment + entrypoint)

**Before:**
```graphql
profilesCollection(first: 1) { ... }
communityUsersCollection(filter: { status: { eq: ACCEPTED } }) { ... }
```

**After:**
```graphql
query CommunityPickerComponentQuery($userId: UUIDFilter!) {
  profilesCollection(filter: { id: $userId }, first: 1) { ... }
  ...CommunityCard_query
}

fragment CommunityCard_query on Query
  @argumentDefinitions(userId: { type: "UUIDFilter!" }) {
  communityUsersCollection(
    filter: { userId: $userId, status: { eq: ACCEPTED } }
  ) { ... }
}
```

- Entrypoint passes `{ userId: { eq: authUserId } }` from `useAuth()`.

#### Dashboard (component + entrypoint)

**Before:**
```graphql
profilesCollection(first: 1) { ... }
communityUsersCollection(filter: { communityId: $communityId, ... }) { ... }
```

**After:**
```graphql
query DashboardComponentQuery($communityId: BigIntFilter!, $userId: UUIDFilter!) {
  profilesCollection(filter: { id: $userId }, first: 1) { ... }
  communityUsersCollection(
    filter: { communityId: $communityId, userId: $userId, status: { eq: ACCEPTED } }
    first: 1
  ) { ... }
}
```

- Entrypoint passes `userId` from `useAuth()`.

#### Sidebar

- The sidebar does not currently fetch data via GraphQL (it uses static text).
  No query changes needed there — it will get community name from the
  Dashboard/Portal data in a future iteration.

### 4. Entrypoint Changes

Both entrypoints need to receive `userId` and pass it as a query variable:

- `CommunityPicker.entrypoint.tsx`: get `userId` from `useAuth()`, pass to
  `loadEntryPoint({ userId })`.
- `Dashboard.entrypoint.tsx`: get `userId` from `useAuth()`, pass to
  `loadEntryPoint({ communityId, userId })`.

### 5. File Change Summary

| File | Change |
|------|--------|
| `supabase/migrations/rls_profiles.sql` | New — RLS policies |
| `src/contexts/AuthContext.tsx` | Add `userId` to context |
| `src/components/community_picker/CommunityPicker.tsx` | Add `$userId` variable, filter `profilesCollection` |
| `src/components/community_picker/CommunityCard.tsx` | Add `@argumentDefinitions` for `userId`, filter `communityUsersCollection` |
| `src/components/community_picker/CommunityPickerQuery.graphql.ts` | Add `$userId` variable and filters |
| `src/views/community_picker/CommunityPicker.entrypoint.tsx` | Pass `userId` from `useAuth()` |
| `src/components/dashboard/Dashboard.tsx` | Add `$userId` variable, filter `profilesCollection` |
| `src/components/dashboard/DashboardQuery.graphql.ts` | Add `$userId` variable and filters |
| `src/views/dashboard/Dashboard.entrypoint.tsx` | Pass `userId` from `useAuth()` |
