import { Col, Row, Space, Typography } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import { useEffect, useState } from 'react';
import {
  EntryPointComponent,
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import fetchFromStorage from '../../utils/fetch_from_storage';
import ProductActions from './ProductActions';
import ProductImageCard from './ProductImageCard';
import ProductInfo from './ProductInfo';
import SellerInfoCard from './SellerInfoCard';
import { ProductDetailPageQuery } from './__generated__/ProductDetailPageQuery.graphql';

const { Title } = Typography;

const productDetailQuery = graphql`
  query ProductDetailPageQuery($id: BigInt) {
    productsCollection(filter: { id: { eq: $id } }) {
      edges {
        node {
          id
          name
          description
          price
          createdAt
          condition
          user {
            id
            username
            avatarUrl
          }
          productImagesCollection(orderBy: [{ displayOrder: AscNullsLast }]) {
            edges {
              node {
                id
                imageUrl
                displayOrder
              }
            }
          }
        }
      }
    }
  }
`;

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
  const { communityId } = useParams<{ communityId: string }>();

  const [imageBlobs, setImageBlobs] = useState<Blob[]>([]);
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);

  const data = usePreloadedQuery<ProductDetailPageQuery>(
    productDetailQuery,
    props.queries.productDetailPageQuery
  );

  const product = data?.productsCollection?.edges?.[0]?.node;

  useEffect(() => {
    if (!product) return;

    const imagePaths =
      product.productImagesCollection?.edges?.map((e) => e.node.imageUrl) ?? [];

    if (imagePaths.length > 0) {
      Promise.all(
        imagePaths.map((path) => fetchFromStorage(path, 'product-images'))
      ).then((blobs) => {
        setImageBlobs(blobs.filter((b): b is Blob => b != null));
      });
    }
  }, [product]);

  useEffect(() => {
    if (product?.user?.avatarUrl) {
      fetchFromStorage(product.user.avatarUrl, 'avatars').then((blob) =>
        setAvatarBlob(blob)
      );
    }
  }, [product?.user?.avatarUrl]);

  if (!product) {
    navigate('/feed');
    return <></>;
  }

  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} md={12}>
          <ProductImageCard name={product.name} imageBlobs={imageBlobs} />
        </Col>

        <Col xs={24} md={12}>
          <Space vertical size="large" style={{ width: '100%' }}>
            <Title level={2} style={{ marginBottom: '8px' }}>
              {product.name}
            </Title>

            <ProductActions />

            <ProductInfo
              price={product.price}
              condition={product.condition ?? null}
              description={product.description}
            />

            <SellerInfoCard
              username={product.user?.username ?? null}
              avatarBlob={avatarBlob}
            />
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetailPage;
