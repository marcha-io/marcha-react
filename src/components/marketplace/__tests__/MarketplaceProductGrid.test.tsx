import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { renderWithAntd } from '../../../test-utils';
import MarketplaceProductGrid from '../MarketplaceProductGrid';

// Mock ProductCard since it uses Relay fragments
jest.mock('../../Products/ProductCard', () => {
  return function MockProductCard() {
    return <div data-testid="product-card">Product Card</div>;
  };
});

describe('MarketplaceProductGrid', () => {
  // Each edge now has `node` directly as a ProductCardFragmentQuery$key
  // (productsCollection edges), not `node.product`.
  const mockEdges = [
    { node: { ' $fragmentSpreads': {}, id: '1' } as any },
    { node: { ' $fragmentSpreads': {}, id: '2' } as any },
    { node: { ' $fragmentSpreads': {}, id: '3' } as any },
  ];

  it('renders product cards when edges are provided', () => {
    renderWithAntd(
      <MarketplaceProductGrid edges={mockEdges} onCreateListing={jest.fn()} />
    );
    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(3);
  });

  it('renders empty state when no edges are provided', () => {
    renderWithAntd(
      <MarketplaceProductGrid edges={[]} onCreateListing={jest.fn()} />
    );
    expect(screen.getByText('No listings found')).toBeInTheDocument();
  });

  it('renders "Create the first listing" button in empty state', () => {
    renderWithAntd(
      <MarketplaceProductGrid edges={[]} onCreateListing={jest.fn()} />
    );
    expect(
      screen.getByRole('button', { name: /create the first listing/i })
    ).toBeInTheDocument();
  });

  it('calls onCreateListing when empty-state button is clicked', () => {
    const onCreateListing = jest.fn();
    renderWithAntd(
      <MarketplaceProductGrid edges={[]} onCreateListing={onCreateListing} />
    );
    fireEvent.click(
      screen.getByRole('button', { name: /create the first listing/i })
    );
    expect(onCreateListing).toHaveBeenCalledTimes(1);
  });
});
