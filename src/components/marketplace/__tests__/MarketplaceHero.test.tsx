import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { renderWithAntd } from '../../../test-utils';
import MarketplaceHero from '../MarketplaceHero';

describe('MarketplaceHero', () => {
  it('renders the title and subtitle', () => {
    renderWithAntd(
      <MarketplaceHero onPostListing={jest.fn()} onMyListings={jest.fn()} />
    );
    expect(screen.getByText('Community Marketplace')).toBeInTheDocument();
    expect(
      screen.getByText('Buy and sell items within your community')
    ).toBeInTheDocument();
  });

  it('renders the Post Listing and My Listings buttons', () => {
    renderWithAntd(
      <MarketplaceHero onPostListing={jest.fn()} onMyListings={jest.fn()} />
    );
    expect(
      screen.getByRole('button', { name: /post listing/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /my listings/i })
    ).toBeInTheDocument();
  });

  it('calls onPostListing when the Post Listing button is clicked', () => {
    const onPostListing = jest.fn();
    renderWithAntd(
      <MarketplaceHero onPostListing={onPostListing} onMyListings={jest.fn()} />
    );
    fireEvent.click(screen.getByRole('button', { name: /post listing/i }));
    expect(onPostListing).toHaveBeenCalledTimes(1);
  });

  it('calls onMyListings when the My Listings button is clicked', () => {
    const onMyListings = jest.fn();
    renderWithAntd(
      <MarketplaceHero onPostListing={jest.fn()} onMyListings={onMyListings} />
    );
    fireEvent.click(screen.getByRole('button', { name: /my listings/i }));
    expect(onMyListings).toHaveBeenCalledTimes(1);
  });
});
