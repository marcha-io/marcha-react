import { useEffect, useRef, useState } from 'react';

/**
 * Returns a debounced version of `value` that only updates after `delay` ms
 * of inactivity. Useful for delaying search queries until the user stops typing.
 *
 * @param value  The value to debounce.
 * @param delay  Debounce delay in milliseconds (default: 400 ms).
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
}
