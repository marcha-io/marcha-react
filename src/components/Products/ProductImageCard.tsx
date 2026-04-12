import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Card, Image } from 'antd';
import React, { useMemo, useState } from 'react';

import { BRAND_PRIMARY } from '../../design';

type ProductImageCardProps = {
  name: string;
  imageBlobs: Blob[];
};

/**
 * Product image display with navigation for multiple images.
 * Shows a single image when only one is available, or a carousel-style
 * navigation with prev/next buttons for multiple images.
 */
const ProductImageCard: React.FC<ProductImageCardProps> = ({
  name,
  imageBlobs,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imageUrls = useMemo(
    () => imageBlobs.map((blob) => URL.createObjectURL(blob)),
    [imageBlobs]
  );

  const hasMultiple = imageUrls.length > 1;
  const currentUrl = imageUrls[currentIndex] ?? '';

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : imageUrls.length - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev < imageUrls.length - 1 ? prev + 1 : 0));

  return (
    <Card
      classNames={{ body: 'product-detail-image' }}
      styles={{ body: { padding: 0, position: 'relative' } }}
    >
      <Image
        alt={name}
        src={currentUrl}
        style={{ width: '100%' }}
        fallback="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=="
      />
      {hasMultiple && (
        <>
          <Button
            type="text"
            icon={<LeftOutlined />}
            onClick={handlePrev}
            style={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '50%',
              width: 36,
              height: 36,
            }}
          />
          <Button
            type="text"
            icon={<RightOutlined />}
            onClick={handleNext}
            style={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '50%',
              width: 36,
              height: 36,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 6,
            }}
          >
            {imageUrls.map((_, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background:
                    idx === currentIndex
                      ? BRAND_PRIMARY
                      : 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.2)',
                }}
              />
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default ProductImageCard;
