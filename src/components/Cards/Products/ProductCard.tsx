import { Avatar, Card } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import { useEffect, useState } from 'react';
import { useFragment } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import fetchFromStorage from '../../../utils/fetch_from_storage';
import { ProductCardFragmentQuery$key } from './__generated__/ProductCardFragmentQuery.graphql';

const { Meta } = Card;

type Props = {
  fragmentRef: ProductCardFragmentQuery$key;
  hoverable?: boolean;
};

const productFragmentQuery = graphql`
  fragment ProductCardFragmentQuery on Products {
    name
    description
    price
    image
    id
    user {
      avatarUrl
      username
    }
  }
`;

const AVATAR_DEFAULT = 'https://api.dicebear.com/7.x/miniavs/svg?seed=8';

const ProductCard = ({ fragmentRef, hoverable }: Props): React.ReactElement => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);

  const product = useFragment(productFragmentQuery, fragmentRef);
  const navigation = useNavigate();

  useEffect(() => {
    fetchFromStorage(product.image, 'product-images').then((blob) =>
      setImageBlob(blob)
    );
    fetchFromStorage(product.user?.avatarUrl ?? '', 'avatars').then((blob) =>
      setAvatarBlob(blob)
    );
  }, [product]);

  return (
    <Card
      hoverable={hoverable}
      style={{ width: 300, height: 350 }}
      cover={
        <img
          height={250}
          alt={product.name}
          src={imageBlob ? URL.createObjectURL(imageBlob) : ''}
        />
      }
      onClick={() => navigation(`${product.id}`)}
    >
      <Meta
        avatar={
          <Avatar
            src={avatarBlob ? URL.createObjectURL(avatarBlob) : AVATAR_DEFAULT}
          />
        }
        title={product.name}
        description={product.description}
      />
    </Card>
  );
};

export default ProductCard;
