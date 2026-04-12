import {
  HeartOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { Button, Space } from 'antd';
import React from 'react';

/**
 * Action buttons (Add to Cart, Save, Share) shown on the product detail page.
 */
const ProductActions: React.FC = () => (
  <Space size="middle" style={{ width: '100%' }}>
    <Button
      type="primary"
      size="large"
      icon={<ShoppingCartOutlined />}
      style={{ flex: 1 }}
    >
      Add to Cart
    </Button>
    <Button size="large" icon={<HeartOutlined />}>
      Save
    </Button>
    <Button size="large" icon={<ShareAltOutlined />}>
      Share
    </Button>
  </Space>
);

export default ProductActions;
