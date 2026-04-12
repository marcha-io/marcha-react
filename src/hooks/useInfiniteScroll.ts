import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook that uses an IntersectionObserver to trigger a callback when a
 * sentinel element enters the viewport. Designed for infinite-scroll lists.
 *
 * @param onLoadMore  Function to call when the sentinel becomes visible.
 * @param enabled     Whether the observer should be active (e.g. `hasNext && !isLoading`).
 * @param rootMargin  CSS margin string for the observer root (default: 200 px bottom).
 * @returns           A ref to attach to the sentinel `<div>`.
 */
export function useInfiniteScroll(
  onLoadMore: () => void,
  enabled: boolean,
  rootMargin = '0px 0px 200px 0px'
): React.RefObject<HTMLDivElement> {
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Wrap in a ref so the observer callback always sees the latest function
  // without needing to disconnect / reconnect on every render.
  const onLoadMoreRef = useRef(onLoadMore);
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore;
  }, [onLoadMore]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0]?.isIntersecting) {
        onLoadMoreRef.current();
      }
    },
    []
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !enabled) return;

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin,
      threshold: 0,
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [enabled, rootMargin, handleIntersect]);

  return sentinelRef;
}
