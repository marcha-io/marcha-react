import { render, screen } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { marchaTheme } from '../../../design';
import MarketplaceContainer from '../MarketplaceContainer';

// ── Mocks ────────────────────────────────────────────────────────────────────
const mockLoadNext = jest.fn();
const mockUsePaginationFragment = jest.fn();

jest.mock('react-relay', () => ({
  ...jest.requireActual('react-relay'),
  usePaginationFragment: (...args: any[]) => mockUsePaginationFragment(...args),
}));

jest.mock('../MarketplaceProductGrid', () => {
  return function MockGrid({
    edges,
    onCreateListing,
  }: {
    edges: any[];
    onCreateListing: () => void;
  }) {
    return (
      <div data-testid="marketplace-grid">
        <span data-testid="edge-count">{edges.length}</span>
        <button onClick={onCreateListing}>Create</button>
      </div>
    );
  };
});

jest.mock('../../../hooks/useInfiniteScroll', () => ({
  useInfiniteScroll: jest.fn(() => ({ current: null })),
}));

// ── Helpers ──────────────────────────────────────────────────────────────────
const mockFragmentRef = {} as any;

function renderContainer(
  hasNext = true,
  isLoadingNext = false,
  edges: any[] = []
) {
  mockUsePaginationFragment.mockReturnValue({
    data: {
      productsCollection: {
        edges,
        pageInfo: { endCursor: 'cursor-abc', hasNextPage: hasNext },
      },
    },
    loadNext: mockLoadNext,
    hasNext,
    isLoadingNext,
  });

  return render(
    <ConfigProvider theme={marchaTheme}>
      <MemoryRouter initialEntries={['/portal/community-1/market']}>
        <Routes>
          <Route
            path="/portal/:communityId/market"
            element={<MarketplaceContainer fragmentRef={mockFragmentRef} />}
          />
        </Routes>
      </MemoryRouter>
    </ConfigProvider>
  );
}

// ── Tests ────────────────────────────────────────────────────────────────────
describe('MarketplaceContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the product grid', () => {
    renderContainer();
    expect(screen.getByTestId('marketplace-grid')).toBeInTheDocument();
  });

  it('passes edges from usePaginationFragment to the grid', () => {
    const edges = [{ node: { id: '1' } }, { node: { id: '2' } }];
    renderContainer(true, false, edges);
    expect(screen.getByTestId('edge-count')).toHaveTextContent('2');
  });

  it('renders the sentinel div when hasNext is true', () => {
    const { container } = renderContainer(true, false);
    const sentinel = container.querySelector('div[style*="height: 1"]');
    expect(sentinel).toBeInTheDocument();
  });

  it('does not render the sentinel div when hasNext is false', () => {
    const { container } = renderContainer(false, false);
    const sentinel = container.querySelector('div[style*="height: 1"]');
    expect(sentinel).not.toBeInTheDocument();
  });

  it('shows loading indicator when isLoadingNext is true', () => {
    renderContainer(true, true);
    expect(screen.getByText(/loading more listings/i)).toBeInTheDocument();
  });

  it('does not show loading indicator when isLoadingNext is false', () => {
    renderContainer(true, false);
    expect(
      screen.queryByText(/loading more listings/i)
    ).not.toBeInTheDocument();
  });

  it('passes empty edges array when productsCollection is null', () => {
    mockUsePaginationFragment.mockReturnValue({
      data: { productsCollection: null },
      loadNext: mockLoadNext,
      hasNext: false,
      isLoadingNext: false,
    });

    render(
      <ConfigProvider theme={marchaTheme}>
        <MemoryRouter initialEntries={['/portal/community-1/market']}>
          <Routes>
            <Route
              path="/portal/:communityId/market"
              element={<MarketplaceContainer fragmentRef={mockFragmentRef} />}
            />
          </Routes>
        </MemoryRouter>
      </ConfigProvider>
    );

    expect(screen.getByTestId('edge-count')).toHaveTextContent('0');
  });
});
