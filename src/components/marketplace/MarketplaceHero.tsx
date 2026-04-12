import {
  PlusOutlined,
  ShopOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Card, Flex, Typography } from 'antd';
import React from 'react';

import {
  BRAND_GRADIENT,
  BRAND_PRIMARY,
  OVERLAY_BORDER,
  OVERLAY_TEXT,
  RADIUS_LG,
  WHITE,
} from '../../design';

type MarketplaceHeroProps = {
  onPostListing: () => void;
  onMyListings: () => void;
};

/**
 * Gradient hero banner at the top of the marketplace page.
 * Contains the title, subtitle, a "My Listings" link, and a "Post Listing" CTA.
 */
const MarketplaceHero: React.FC<MarketplaceHeroProps> = ({
  onPostListing,
  onMyListings,
}) => (
  <Card
    style={{
      background: BRAND_GRADIENT,
      borderRadius: RADIUS_LG,
      border: `1px solid ${OVERLAY_BORDER}`,
      marginBottom: 24,
    }}
    styles={{ body: { padding: '32px 24px' } }}
  >
    <Flex justify="space-between" align="center" wrap="wrap" gap={16}>
      <div>
        <Typography.Title
          level={3}
          style={{ color: WHITE, margin: 0, marginBottom: 4 }}
        >
          <ShopOutlined style={{ marginRight: 8 }} />
          Community Marketplace
        </Typography.Title>
        <Typography.Text style={{ color: OVERLAY_TEXT }}>
          Buy and sell items within your community
        </Typography.Text>
      </div>
      <Flex gap={12}>
        <Button
          size="large"
          icon={<UnorderedListOutlined />}
          onClick={onMyListings}
          style={{
            background: 'rgba(255,255,255,0.2)',
            color: WHITE,
            fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          My Listings
        </Button>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={onPostListing}
          style={{
            background: WHITE,
            color: BRAND_PRIMARY,
            fontWeight: 600,
            border: 'none',
          }}
        >
          Post Listing
        </Button>
      </Flex>
    </Flex>
  </Card>
);

export default MarketplaceHero;
