import { Avatar, Card } from 'antd';
import graphql from 'babel-plugin-relay/macro';
import { useEffect, useState } from 'react';
import { useFragment } from 'react-relay';

import supabase from '../../../lib/supabase';
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
    user {
      avatarUrl
    }
  }
`;

const AVATAR_DEFAULT = 'https://api.dicebear.com/7.x/miniavs/svg?seed=8';

const fetchFromStorage = async (url: string, storage_name: string) => {
  const { data: blob, error } = await supabase.storage
    .from(storage_name)
    .download(url);

  if (error != null) {
    console.log(error);
    return null;
  }

  return blob;
};

const ProductCard = ({ fragmentRef, hoverable }: Props): React.ReactElement => {
  const [imageBlob, setImageBlob] = useState<Blob | null>(null);
  const [avatarBlob, setAvatarBlob] = useState<Blob | null>(null);

  const product = useFragment(productFragmentQuery, fragmentRef);

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
      style={{ width: 300, minHeight: 350 }}
      cover={
        <img
          height={250}
          alt={product.name}
          src={imageBlob ? URL.createObjectURL(imageBlob) : ''}
        />
      }
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
