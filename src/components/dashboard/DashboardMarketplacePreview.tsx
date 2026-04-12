import { ShopOutlined } from '@ant-design/icons';
import { Avatar, Card, List, Tag, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React, { useEffect, useState } from 'react';
import { useFragment } from 'react-relay';

import {
  BRAND_PRIMARY,
  NEUTRAL_100,
  NEUTRAL_500,
  NEUTRAL_900,
  RADIUS_LG,
  RADIUS_SM,
} from '../../design';
import fetchFromStorage from '../../utils/fetch_from_storage';
import type { DashboardMarketplacePreviewFragment$key } from './__generated__/DashboardMarketplacePreviewFragment.graphql';

export const dashboardMarketplacePreviewFragment = graphql`
  fragment DashboardMarketplacePreviewFragment on Query
  @argumentDefinitions(communityId: { type: "BigIntFilter" }) {
    productsCommunitiesCollection(
      first: 3
      orderBy: [{ createdAt: DescNullsLast }]
      filter: { communityId: $communityId }
    ) {
      edges {
        node {
          product {
            id
            name
            price
            createdAt
            productImagesCollection(
              first: 1
              orderBy: [{ displayOrder: AscNullsLast }]
            ) {
              edges {
                node {
                  imageUrl
                }
              }
            }
          }
        }
      }
    }
  }
`;

/** A listing is "New" if it was created within the last 7 days. */
const isNewListing = (createdAt: string): boolean => {
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return new Date(createdAt).getTime() > sevenDaysAgo;
};

type ListingRowProps = {
  id: string;
  name: string;
  price: number;
  imagePath: string | undefined;
  createdAt: string;
  onNavigate: (id: string) => void;
};

const ListingRow: React.FC<ListingRowProps> = ({
  id,
  name,
  price,
  imagePath,
  createdAt,
  onNavigate,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imagePath) {
      fetchFromStorage(imagePath, 'product-images').then((blob) => {
        if (blob) setImageUrl(URL.createObjectURL(blob));
      });
    }
  }, [imagePath]);

  return (
    <List.Item
      style={{
        padding: '8px 0',
        cursor: 'pointer',
        borderBottom: `1px solid ${NEUTRAL_100}`,
      }}
      onClick={() => onNavigate(id)}
    >
      <List.Item.Meta
        avatar={
          <Avatar
            src={imageUrl ?? undefined}
            icon={!imageUrl ? <ShopOutlined /> : undefined}
            shape="square"
            size={44}
            style={{
              borderRadius: RADIUS_SM,
              backgroundColor: NEUTRAL_100,
              flexShrink: 0,
            }}
          />
        }
        title={
          <Typography.Text
            strong
            style={{
              fontSize: 13,
              color: NEUTRAL_900,
              display: 'block',
              lineHeight: '1.3',
              marginBottom: 2,
            }}
            ellipsis
          >
            {name}
          </Typography.Text>
        }
        description={
          <Typography.Text
            style={{ fontSize: 13, color: BRAND_PRIMARY, fontWeight: 600 }}
          >
            £{price.toFixed(2)}
          </Typography.Text>
        }
      />
      {isNewListing(createdAt) && (
        <Tag
          color="green"
          style={{
            fontSize: 11,
            padding: '0 6px',
            lineHeight: '18px',
            borderRadius: RADIUS_SM,
            marginLeft: 8,
            flexShrink: 0,
          }}
        >
          New
        </Tag>
      )}
    </List.Item>
  );
};

type Props = {
  fragmentRef: DashboardMarketplacePreviewFragment$key;
  onBrowse: () => void;
  onNavigateToListing: (id: string) => void;
};

const DashboardMarketplacePreview: React.FC<Props> = ({
  fragmentRef,
  onBrowse,
  onNavigateToListing,
}) => {
  const data = useFragment(dashboardMarketplacePreviewFragment, fragmentRef);
  const listings = data.productsCommunitiesCollection?.edges ?? [];

  return (
    <Card
      title={
        <Typography.Text
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: NEUTRAL_500,
          }}
        >
          Marketplace
        </Typography.Text>
      }
      extra={
        <Typography.Link
          onClick={onBrowse}
          style={{ fontSize: 13, color: BRAND_PRIMARY }}
        >
          Browse
        </Typography.Link>
      }
      style={{ borderRadius: RADIUS_LG, marginBottom: 24 }}
      styles={{ body: { padding: '0 16px' } }}
    >
      {listings.length === 0 ? (
        <Typography.Text
          type="secondary"
          style={{
            display: 'block',
            padding: '16px 0',
            fontSize: 13,
            textAlign: 'center',
          }}
        >
          No marketplace items yet
        </Typography.Text>
      ) : (
        <List
          dataSource={[...listings]}
          renderItem={(edge) => {
            const product = edge.node.product;
            if (product == null) return null;

            const coverImage =
              product.productImagesCollection?.edges?.[0]?.node?.imageUrl;

            return (
              <ListingRow
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imagePath={coverImage}
                createdAt={product.createdAt}
                onNavigate={onNavigateToListing}
              />
            );
          }}
        />
      )}
    </Card>
  );
};

export default DashboardMarketplacePreview;
