import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Empty, Row, Skeleton } from 'antd';
import React, { Suspense } from 'react';

import { RADIUS_LG } from '../../design';
import ProductCard from '../Products/ProductCard';
import type { ProductCardFragmentQuery$key } from '../Products/__generated__/ProductCardFragmentQuery.graphql';

/**
 * Each edge from `productsCollection` has a `node` that is a `Products`
 * object and directly spreads `ProductCardFragmentQuery`.
 */
type Edge = {
  readonly node: ProductCardFragmentQuery$key;
};

type MarketplaceProductGridProps = {
  edges: readonly Edge[];
  onCreateListing: () => void;
};

/**
 * Skeleton placeholder that mirrors the ProductCard shape while the card
 * content is loading via Suspense.
 */
const CardSkeleton: React.FC = () => (
  <div style={{ borderRadius: RADIUS_LG, overflow: 'hidden' }}>
    <Skeleton.Image active style={{ width: '100%', height: 160 }} />
    <div style={{ padding: '12px 14px' }}>
      <Skeleton active paragraph={{ rows: 2 }} title={false} />
    </div>
  </div>
);

/**
 * Responsive product card grid.
 *
 * Desktop (≥ lg): 4 columns
 * Tablet  (sm–md): 2 columns
 * Mobile  (xs):   2 columns
 *
 * Uses antd Row/Col so the layout integrates with the rest of the antd grid.
 * Products are pre-filtered server-side — no client-side filtering here.
 */
const MarketplaceProductGrid: React.FC<MarketplaceProductGridProps> = ({
  edges,
  onCreateListing,
}) => {
  if (edges.length === 0) {
    return (
      <Empty description="No listings found" style={{ padding: '48px 0' }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onCreateListing}
        >
          Create the first listing
        </Button>
      </Empty>
    );
  }

  return (
    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
      {edges.map((edge, i) => (
        <Col key={i} xs={12} sm={12} md={8} lg={6}>
          <Suspense fallback={<CardSkeleton />}>
            <ProductCard fragmentRef={edge.node} hoverable />
          </Suspense>
        </Col>
      ))}
    </Row>
  );
};

export default MarketplaceProductGrid;
