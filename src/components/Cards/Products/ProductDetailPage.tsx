import {
  HeartOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Row,
  Space,
  Tag,
  Typography,
} from 'antd';
import graphql from 'babel-plugin-relay/macro';
import { useEffect, useState } from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';
import { useNavigate } from 'react-router-dom';

import fetchFromStorage from '../../../utils/fetch_from_storage';
import { ProductDetailPageQuery } from './__generated__/ProductDetailPageQuery.graphql';

const { Title, Paragraph } = Typography;

const productDetailQuery = graphql`
  query ProductDetailPageQuery($id: BigInt) {
    productsCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          name
          description
          price
          image
          createdAt
          condition
          user {
            id
            username
            avatarUrl
          }
        }
      }
    }
  }
`;

const AVATAR_DEFAULT = 'https://api.dicebear.com/7.x/miniavs/svg?seed=8';

type Props = {
  queries: {
    productDetailPageQuery: PreloadedQuery<ProductDetailPageQuery>;
  };
};

const ProductDetailPage: EntryPointComponent<
  {
    productDetailPageQuery: ProductDetailPageQuery;
  },
  Record<string, never>,
  Record<string, never>
> = (props: Props): React.ReactElement => {
  const navigate = useNavigate();

  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);

  const data = usePreloadedQuery<ProductDetailPageQuery>(
    productDetailQuery,
    props.queries.productDetailPageQuery
  );

  const product = data?.productsCollection?.edges?.[0]?.node;

  useEffect(() => {
    if (product) {
      fetchFromStorage(product.image, 'product-images').then((blob) =>
        setImageBlob(blob)
      );
      fetchFromStorage(product.user?.avatarUrl ?? '', 'avatars').then((blob) =>
        setAvatarBlob(blob)
      );
    }
  }, [product]);

  if (!product) {
    navigate('/feed');
    return <></>;
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <Row gutter={[32, 32]}>
        {/* Product Image */}
        <Col xs={24} md={12}>
          <Card
            cover={
              <img
                alt={product.name}
                src={imageBlob ? URL.createObjectURL(imageBlob) : ''}
                style={{
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
            }
          >
            {/* Product Info */}
            <Descriptions column={1}>
              <Descriptions.Item label="Price">
                ${product.price}{' '}
              </Descriptions.Item>

              <Descriptions.Item label="Status">
                <Tag color="green">{product.condition}</Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Listed">
                {new Date(product.createdAt).toLocaleDateString()}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Product Details */}
        <Col xs={24} md={12}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* Product Title and Price */}
            <div>
              <Title level={2} style={{ marginBottom: '8px' }}>
                {product.name}
              </Title>
            </div>

            {/* Action Buttons */}
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

            {/* Description */}
            <Card title="Description">
              <Paragraph>{product.description}</Paragraph>
            </Card>

            {/* Seller Info */}
            <Card title="Seller Information">
              <Space size="middle">
                <Avatar
                  size={64}
                  src={
                    avatarBlob
                      ? URL.createObjectURL(avatarBlob)
                      : AVATAR_DEFAULT
                  }
                  icon={<UserOutlined />}
                />
                <div>
                  <Title level={5} style={{ marginBottom: '4px' }}>
                    {product.user?.username || 'Anonymous'}
                  </Title>
                  <br />
                  <Button type="link" style={{ paddingLeft: 0 }}>
                    View Seller Profile
                  </Button>
                </div>
              </Space>
            </Card>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
