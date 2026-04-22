import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Tag, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import React, { useEffect, useMemo, useState } from 'react';
import { useFragment } from 'react-relay';
import { useNavigate } from 'react-router';

import { useAuth } from '../../contexts/AuthContext';
import {
  BRAND_PRIMARY,
  COLOR_SUCCESS,
  NEUTRAL_100,
  NEUTRAL_400,
  NEUTRAL_500,
  NEUTRAL_700,
  RADIUS_LG,
} from '../../design';
import fetchFromStorage from '../../utils/fetch_from_storage';
import { AVATAR_DEFAULT } from '../marketplace/constants';
import { ProductCardFragmentQuery$key } from './__generated__/ProductCardFragmentQuery.graphql';

type Props = {
  fragmentRef: ProductCardFragmentQuery$key;
  hoverable?: boolean;
};

const productFragmentQuery = graphql`
  fragment ProductCardFragmentQuery on Products {
    name
    description
    price
    id
    categoryId
    condition
    userId
    user {
      avatarUrl
      username
      firstName
      lastName
    }
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
`;

/** Derives the status tag color and label from the product price. */
function getStatusTag(price: number): { label: string; color: string } {
  if (price === 0) {
    return { label: 'Free', color: 'success' };
  }

  return { label: 'Available', color: 'success' };
}

const ProductCard = ({
  fragmentRef,
  hoverable = true,
}: Props): React.ReactElement => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  const product = useFragment(productFragmentQuery, fragmentRef);
  const navigate = useNavigate();
  const { userId } = useAuth();

  const isOwnListing = userId != null && product.userId === userId;

  useEffect(() => {
    const imagePath =
      product.productImagesCollection?.edges?.[0]?.node?.imageUrl;

    if (imagePath) {
      setImageLoading(true);
      fetchFromStorage(imagePath, `product-images/${product.id}`).then(
        (blob) => {
          if (blob) setImageBlob(blob);
          setImageLoading(false);
        }
      );
    }
  }, [product.productImagesCollection]);

  useEffect(() => {
    if (product.user?.avatarUrl) {
      fetchFromStorage(product.user.avatarUrl, 'avatars').then((blob) => {
        if (blob) setAvatarBlob(blob);
      });
    }
  }, [product.user?.avatarUrl]);

  const imageUrl = useMemo(
    () => (imageBlob ? URL.createObjectURL(imageBlob) : null),
    [imageBlob]
  );

  const avatarUrl = useMemo(
    () => (avatarBlob ? URL.createObjectURL(avatarBlob) : AVATAR_DEFAULT),
    [avatarBlob]
  );

  const handleClick = () => {
    if (hoverable) navigate(`${product.id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (hoverable && (e.key === 'Enter' || e.key === ' ')) {
      navigate(`${product.id}`);
    }
  };

  const isFree = product.price === 0;
  const priceDisplay = isFree ? 'Free' : `£${product.price}`;
  const priceColor = isFree ? COLOR_SUCCESS : BRAND_PRIMARY;

  const sellerName =
    product.user?.firstName || product.user?.username || 'Seller';

  const statusTag = getStatusTag(product.price);

  /**
   * The image area is rendered as the Card `cover` prop.
   * It uses a 4:3 aspect ratio (paddingTop 75%) so cards stay uniform
   * regardless of the source image dimensions.
   */
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
          alt={product.name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
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

      {/* "Your listing" badge — top-left */}
      {isOwnListing && (
        <Tag
          icon={<UserOutlined />}
          color={BRAND_PRIMARY}
          style={{
            position: 'absolute',
            top: 8,
            left: 8,
            margin: 0,
            fontWeight: 600,
            fontSize: 11,
            borderRadius: 20,
            border: 'none',
          }}
        >
          Your listing
        </Tag>
      )}

      {/* Status badge — top-right */}
      <Tag
        color={statusTag.color}
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
        {statusTag.label}
      </Tag>
    </div>
  );

  return (
    <Card
      cover={coverElement}
      hoverable={hoverable}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={hoverable ? 0 : undefined}
      role={hoverable ? 'button' : undefined}
      style={{
        borderRadius: RADIUS_LG,
        overflow: 'hidden',
        border: 'none',
        width: '100%',
      }}
      styles={{ body: { padding: '12px 14px 14px' } }}
    >
      <Typography.Text
        strong
        ellipsis={{ tooltip: product.name }}
        style={{
          display: 'block',
          fontSize: 14,
          color: NEUTRAL_700,
          lineHeight: '20px',
          marginBottom: 4,
        }}
      >
        {product.name}
      </Typography.Text>

      <Typography.Text
        style={{
          display: 'block',
          fontSize: 20,
          fontWeight: 700,
          color: priceColor,
          lineHeight: '26px',
          marginBottom: 8,
        }}
      >
        {priceDisplay}
      </Typography.Text>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Avatar
          size={22}
          src={avatarUrl}
          icon={<UserOutlined />}
          style={{ flexShrink: 0, background: NEUTRAL_100, color: NEUTRAL_500 }}
        />
        <Typography.Text ellipsis style={{ fontSize: 12, color: NEUTRAL_500 }}>
          {sellerName}
        </Typography.Text>
      </div>
    </Card>
  );
};

export default ProductCard;
