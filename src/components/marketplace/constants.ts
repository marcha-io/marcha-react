/**
 * Shared constants used across marketplace components.
 */

/** Number of listings fetched per page (initial load and each infinite-scroll trigger). */
export const PAGE_SIZE = 12;

/** Product condition options used in both filters and the create-listing form. */
export const CONDITIONS = [
  { label: 'New', value: 'New' },
  { label: 'Like New', value: 'Like_new' },
  { label: 'Good', value: 'Good' },
  { label: 'Used', value: 'Used' },
] as const;

/** Fallback avatar URL when the seller has no avatar. */
export const AVATAR_DEFAULT = 'https://api.dicebear.com/7.x/miniavs/svg?seed=8';
