import graphql from 'babel-plugin-relay/macro';
import { useEffect, useState } from 'react';
import { useFragment } from 'react-relay';
import { useNavigate } from 'react-router';

import fetchFromStorage from '../../utils/fetch_from_storage';
import GeneralCard from '../Cards/GeneralCard';
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
    image
    id
    user {
      avatarUrl
      username
    }
  }
`;

const ProductCard = ({ fragmentRef, hoverable }: Props): React.ReactElement => {
  const [imageBlob, setImageBlob] = useState<Blob>(new Blob());
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);

  const product = useFragment(productFragmentQuery, fragmentRef);
  const navigation = useNavigate();

  useEffect(() => {
    fetchFromStorage(product.image, 'product-images').then((blob) =>
      setImageBlob(blob ?? imageBlob)
    );

    if (product.user?.avatarUrl) {
      fetchFromStorage(product.user.avatarUrl, 'avatars').then((blob) =>
        setAvatarBlob(blob)
      );
    }
  }, [product]);

  return (
    <GeneralCard
      name={product.name}
      description={product.description}
      onClick={() => navigation(`${product.id}`)}
      hoverable={hoverable}
      imageBlob={imageBlob}
      avatarBlob={avatarBlob}
      hasAvatar={true}
    />
  );
};

export default ProductCard;
