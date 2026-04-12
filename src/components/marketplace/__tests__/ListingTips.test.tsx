import { screen } from '@testing-library/react';
import React from 'react';

import { renderWithAntd } from '../../../test-utils';
import ListingTips from '../createListing/ListingTips';

describe('ListingTips', () => {
  it('renders the "Listing Tips" title', () => {
    renderWithAntd(<ListingTips />);
    expect(screen.getByText('Listing Tips')).toBeInTheDocument();
  });

  it('renders the photo tip', () => {
    renderWithAntd(<ListingTips />);
    expect(screen.getByText(/great photos sell/i)).toBeInTheDocument();
  });

  it('renders the condition tip', () => {
    renderWithAntd(<ListingTips />);
    expect(screen.getByText(/be honest about condition/i)).toBeInTheDocument();
  });

  it('renders the pricing tip', () => {
    renderWithAntd(<ListingTips />);
    expect(screen.getByText(/set a fair price/i)).toBeInTheDocument();
  });
});
