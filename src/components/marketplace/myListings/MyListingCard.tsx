import {
  EditOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { Button, Card, Flex, Skeleton, Tag, Typography } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { usePreloadedQuery } from 'react-relay';

import {
  BRAND_PRIMARY,
  COLOR_SUCCESS,
  NEUTRAL_100,
  NEUTRAL_400,
  NEUTRAL_500,
  NEUTRAL_700,
  RADIUS_LG,
} from '../../../design';
import fetchFromStorage from '../../../utils/fetch_from_storage';
import { MyListingsPageQuery } from './__generated__/MyListingsPageQuery.graphql';

export type ListingNode = NonNullable<
  NonNullable<
    NonNullable<
      ReturnType<typeof usePreloadedQuery<MyListingsPageQuery>>
    >['productsCollection']
  >['edges']
>[number]['node'];

type ListingCardProps = {
  listing: ListingNode;
  onEdit: (listing: ListingNode) => void;
  onToggleVisibility: (listing: ListingNode) => void;
  isTogglingVisibility: boolean;
};

/**
 * A single listing card in the "My Listings" grid.
 *
 * Shows the product image (or a placeholder), name, price, active/unlisted
 * status tag, and Edit / Unlist / Re-list action buttons.
 */
const MyListingCard: React.FC<ListingCardProps> = ({
  listing,
  onEdit,
  onToggleVisibility,
  isTogglingVisibility,
}) => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const imagePath =
      listing.productImagesCollection?.edges?.[0]?.node?.imageUrl;

    setImageLoading(true);
    if (imagePath) {
      fetchFromStorage(imagePath, 'product-images').then((blob) => {
        if (blob) setImageBlob(blob);
        setImageLoading(false);
      });
    } else {
      setImageLoading(false);
    }
  }, [listing.productImagesCollection]);

  const imageUrl = useMemo(
    () => (imageBlob ? URL.createObjectURL(imageBlob) : null),
    [imageBlob]
  );

  const isFree = listing.price === 0;
  const priceDisplay = isFree ? 'Free' : `£${listing.price.toFixed(2)}`;
  const priceColor = isFree ? COLOR_SUCCESS : BRAND_PRIMARY;
  const isPublic = listing.isPublic !== false;

  const coverElement = (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingTop: '75%',
        background: NEUTRAL_100,
        overflow: 'hidden',
      }}
    >
      {imageLoading ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'inherit',
          }}
        >
          <Skeleton.Image active style={{ width: '100%', height: '100%' }} />
        </div>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt={listing.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        // Placeholder icon when no image is available
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              stroke={NEUTRAL_400}
              strokeWidth="1.5"
            />
            <circle
              cx="8.5"
              cy="8.5"
              r="1.5"
              stroke={NEUTRAL_400}
              strokeWidth="1.5"
            />
            <path
              d="M3 15l5-5 4 4 3-3 6 6"
              stroke={NEUTRAL_400}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* Active / Unlisted status badge — top-right of image */}
      <Tag
        color={isPublic ? 'success' : 'default'}
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          margin: 0,
          fontSize: 11,
          fontWeight: 600,
          borderRadius: 20,
        }}
      >
        {isPublic ? 'Active' : 'Unlisted'}
      </Tag>
    </div>
  );

  return (
    <Card
      cover={coverElement}
      style={{ borderRadius: RADIUS_LG, overflow: 'hidden', border: 'none' }}
      styles={{ body: { padding: '12px 14px 14px' } }}
    >
      {/* Product name */}
      <Typography.Text
        strong
        ellipsis={{ tooltip: listing.name }}
        style={{
          display: 'block',
          fontSize: 14,
          color: NEUTRAL_700,
          lineHeight: '20px',
          marginBottom: 4,
        }}
      >
        {listing.name}
      </Typography.Text>

      {/* Price */}
      <Typography.Text
        style={{
          display: 'block',
          fontSize: 18,
          fontWeight: 700,
          color: priceColor,
          lineHeight: '24px',
          marginBottom: 10,
        }}
      >
        {priceDisplay}
      </Typography.Text>

      {/* Action buttons */}
      <Flex gap={8}>
        <Button
          size="small"
          icon={<EditOutlined />}
          onClick={() => onEdit(listing)}
          style={{ flex: 1 }}
        >
          Edit
        </Button>
        <Button
          size="small"
          type={isPublic ? 'default' : 'primary'}
          icon={isPublic ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          onClick={() => onToggleVisibility(listing)}
          loading={isTogglingVisibility}
          style={{ flex: 1 }}
        >
          {isPublic ? 'Unlist' : 'Re-list'}
        </Button>
      </Flex>
    </Card>
  );
};

export default MyListingCard;
