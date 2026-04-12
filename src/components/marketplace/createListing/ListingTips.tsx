import { Card, Typography } from 'antd';
import React from 'react';

import { RADIUS_LG } from '../../../design';

/**
 * Sidebar card with helpful tips for creating a listing.
 */
const ListingTips: React.FC = () => (
  <Card title="Listing Tips" style={{ borderRadius: RADIUS_LG }}>
    <Typography.Paragraph>
      <strong>Great photos sell.</strong> Use natural lighting and show the item
      from multiple angles.
    </Typography.Paragraph>
    <Typography.Paragraph>
      <strong>Be honest about condition.</strong> Buyers appreciate transparency
      about wear and tear.
    </Typography.Paragraph>
    <Typography.Paragraph>
      <strong>Set a fair price.</strong> Check similar listings to price your
      item competitively.
    </Typography.Paragraph>
  </Card>
);

export default ListingTips;
