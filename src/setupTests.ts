// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// ── matchMedia polyfill (required by antd's responsiveObserver) ──────────────
// antd v6 calls window.matchMedia() during component mount to detect
// responsive breakpoints. jsdom does not implement matchMedia, so we provide a
// complete mock that satisfies antd's listener({ matches }) destructuring.
//
// IMPORTANT: We use a plain function (not jest.fn().mockImplementation) because
// Object.defineProperty + jest.fn() can return undefined in some jsdom versions.
window.matchMedia = window.matchMedia || function matchMediaPolyfill(query: string) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
};

// ── IntersectionObserver polyfill ────────────────────────────────────────────
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  private callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    (MockIntersectionObserver as any)._instance = this;
  }

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  simulateIntersection(isIntersecting: boolean): void {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this,
    );
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// ── ResizeObserver polyfill (required by antd's rc-resize-observer) ──────────
class MockResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

window.ResizeObserver = window.ResizeObserver || (MockResizeObserver as any);

// ── getComputedStyle safety net ──────────────────────────────────────────────
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
  try {
    return originalGetComputedStyle(elt, pseudoElt);
  } catch {
    return {} as CSSStyleDeclaration;
  }
};

// ── Suppress noisy console output in tests ───────────────────────────────────
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args: any[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (
    msg.includes('[antd:') ||
    msg.includes('deprecated') ||
    msg.includes('Warning:')
  ) {
    return;
  }
  originalWarn(...args);
};

console.error = (...args: any[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (
    msg.includes('act(') ||
    msg.includes('not wrapped in act') ||
    msg.includes('responsiveObserver') ||
    msg.includes('matchMedia')
  ) {
    return;
  }
  originalError(...args);
};
