/**
 * Shared test utilities.
 *
 * Provides a `renderWithProviders` helper that wraps components in the same
 * providers used by the real app (antd ConfigProvider + React Router), so
 * antd's useToken / responsiveObserver work correctly in tests.
 */
import { ConfigProvider } from 'antd';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { marchaTheme } from './design';

type WrapperOptions = {
  routerProps?: MemoryRouterProps;
};

/**
 * Creates a wrapper component with antd ConfigProvider and MemoryRouter.
 */
function createWrapper({ routerProps }: WrapperOptions = {}) {
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <ConfigProvider theme={marchaTheme}>
        <MemoryRouter {...routerProps}>{children}</MemoryRouter>
      </ConfigProvider>
    );
  };
}

/**
 * Render a component wrapped in ConfigProvider + MemoryRouter.
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { routerProps?: MemoryRouterProps },
) {
  const { routerProps, ...renderOptions } = options ?? {};
  return render(ui, {
    wrapper: createWrapper({ routerProps }),
    ...renderOptions,
  });
}

/**
 * Render a component wrapped only in ConfigProvider (no router).
 */
export function renderWithAntd(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <ConfigProvider theme={marchaTheme}>{children}</ConfigProvider>
    ),
    ...options,
  });
}
