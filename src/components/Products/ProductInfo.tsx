import { Card, Descriptions, Tag, Typography } from 'antd';
import React from 'react';

type ProductInfoProps = {
  price: number;
  condition: string | null;
  description: string;
};

/**
 * Product information card showing price, condition tag, and description.
 */
const ProductInfo: React.FC<ProductInfoProps> = ({
  price,
  condition,
  description,
}) => (
  <>
    <Card title="Product Information">
      <Descriptions column={2}>
        <Descriptions.Item label="Price">£{price}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color="green">{condition}</Tag>
        </Descriptions.Item>
      </Descriptions>
    </Card>

    <Card title="Description" style={{ marginTop: 16 }}>
      <Typography.Paragraph>{description}</Typography.Paragraph>
    </Card>
  </>
);

export default ProductInfo;
