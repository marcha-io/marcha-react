import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import React from 'react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';

import { marchaTheme } from '../../../design';
import MarketplaceFilters from '../MarketplaceFilters';

// ── Mocks ─────────────────────────────────────────────────────────────────────
// CategoriesFilter uses useLazyLoadQuery internally and requires a Relay
// environment. We mock it to avoid that dependency in filter-level unit tests.
jest.mock('../marketplaceFilters/CategoriesFilter', () => {
  return function MockCategoriesFilter({
    setCategories,
  }: {
    setCategories: (v: string) => void;
  }) {
    return (
      <select
        data-testid="categories-select"
        onChange={(e) => setCategories(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="cat-1">Electronics</option>
        <option value="cat-2">Furniture</option>
      </select>
    );
  };
});

jest.mock('../marketplaceFilters/CategoriesFilterLoading', () => {
  return function MockCategoriesFilterLoading() {
    return <div data-testid="categories-loading" />;
  };
});

// ── Helpers ───────────────────────────────────────────────────────────────────
let capturedSearchParams: URLSearchParams = new URLSearchParams();

function SearchParamsCapture() {
  const [searchParams] = useSearchParams();
  capturedSearchParams = searchParams;
  return null;
}

function renderFilters(initialEntries: string[] = ['/']) {
  return render(
    <ConfigProvider theme={marchaTheme}>
      <MemoryRouter initialEntries={initialEntries}>
        <SearchParamsCapture />
        <MarketplaceFilters />
      </MemoryRouter>
    </ConfigProvider>
  );
}

// ── Tests ─────────────────────────────────────────────────────────────────────
describe('MarketplaceFilters', () => {
  beforeEach(() => {
    capturedSearchParams = new URLSearchParams();
  });

  it('renders the search input', () => {
    renderFilters();
    expect(screen.getByPlaceholderText('Search items...')).toBeInTheDocument();
  });

  it('renders the categories and conditions filter controls', () => {
    renderFilters();
    expect(screen.getByTestId('categories-select')).toBeInTheDocument();
    expect(screen.getByText('All Conditions')).toBeInTheDocument();
  });

  it('populates search input from URL params', () => {
    renderFilters(['/?q=bike']);
    const input = screen.getByPlaceholderText('Search items...');
    expect(input).toHaveValue('bike');
  });

  it('updates the q search param after debounce when typing in the search input', async () => {
    renderFilters();
    const input = screen.getByPlaceholderText('Search items...');
    fireEvent.change(input, { target: { value: 'laptop' } });
    await waitFor(
      () => {
        expect(capturedSearchParams.get('q')).toBe('laptop');
      },
      { timeout: 1000 }
    );
  });

  it('clears the cursor param when the search input changes', async () => {
    renderFilters(['/?q=old&cursor=abc123']);
    const input = screen.getByPlaceholderText('Search items...');
    fireEvent.change(input, { target: { value: 'new' } });
    await waitFor(
      () => {
        expect(capturedSearchParams.get('cursor')).toBeNull();
      },
      { timeout: 1000 }
    );
  });

  it('sets the categories param when a category is selected', async () => {
    renderFilters();
    const select = screen.getByTestId('categories-select');
    fireEvent.change(select, { target: { value: 'cat-1' } });
    await waitFor(() => {
      expect(capturedSearchParams.get('categories')).toBe('cat-1');
    });
  });

  it('clears the categories param when the category selection is cleared', async () => {
    renderFilters(['/?categories=cat-1']);
    const select = screen.getByTestId('categories-select');
    fireEvent.change(select, { target: { value: '' } });
    await waitFor(() => {
      expect(capturedSearchParams.get('categories')).toBeNull();
    });
  });
});
