import { screen } from '@testing-library/react';
import React from 'react';

import { renderWithAntd } from '../../../test-utils';
import ProductActions from '../ProductActions';
import ProductImageCard from '../ProductImageCard';
import ProductInfo from '../ProductInfo';
import SellerInfoCard from '../SellerInfoCard';

// ── ProductActions ───────────────────────────────────────────────────────────

describe('ProductActions', () => {
  it('renders Add to Cart, Save, and Share buttons', () => {
    renderWithAntd(<ProductActions />);
    expect(
      screen.getByRole('button', { name: /add to cart/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument();
  });
});

// ── ProductInfo ──────────────────────────────────────────────────────────────

describe('ProductInfo', () => {
  it('renders price, condition, and description', () => {
    renderWithAntd(
      <ProductInfo
        price={49.99}
        condition="New"
        description="A brand new widget"
      />
    );
    expect(screen.getByText('£49.99')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByText('A brand new widget')).toBeInTheDocument();
  });

  it('renders "Product Information" and "Description" card titles', () => {
    renderWithAntd(
      <ProductInfo price={10} condition="Good" description="Decent item" />
    );
    expect(screen.getByText('Product Information')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});

// ── SellerInfoCard ───────────────────────────────────────────────────────────

describe('SellerInfoCard', () => {
  it('renders seller username', () => {
    renderWithAntd(<SellerInfoCard username="john_doe" avatarBlob={null} />);
    expect(screen.getByText('john_doe')).toBeInTheDocument();
  });

  it('renders "Anonymous" when username is null', () => {
    renderWithAntd(<SellerInfoCard username={null} avatarBlob={null} />);
    expect(screen.getByText('Anonymous')).toBeInTheDocument();
  });

  it('renders "Seller Information" title', () => {
    renderWithAntd(<SellerInfoCard username="jane" avatarBlob={null} />);
    expect(screen.getByText('Seller Information')).toBeInTheDocument();
  });

  it('renders "View Seller Profile" button', () => {
    renderWithAntd(<SellerInfoCard username="jane" avatarBlob={null} />);
    expect(
      screen.getByRole('button', { name: /view seller profile/i })
    ).toBeInTheDocument();
  });
});

// ── ProductImageCard ─────────────────────────────────────────────────────────

describe('ProductImageCard', () => {
  it('renders an image with the product name as alt text', () => {
    renderWithAntd(<ProductImageCard name="Test Widget" imageBlobs={[]} />);
    const img = screen.getByAltText('Test Widget');
    expect(img).toBeInTheDocument();
  });
});
