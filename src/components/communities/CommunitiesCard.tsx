import graphql from 'babel-plugin-relay/macro';
import { useEffect, useState } from 'react';
import { useFragment } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import fetchFromStorage from '../../utils/fetch_from_storage';
import GeneralCard from '../Cards/GeneralCard';
import { CommunitiesCardFragmentQuery$key } from './__generated__/CommunitiesCardFragmentQuery.graphql';

const communitiesCardFragmentQuery = graphql`
  fragment CommunitiesCardFragmentQuery on Communities {
    name
    address
    image
    id
    nodeId
  }
`;

type Props = {
  fragmentRef: CommunitiesCardFragmentQuery$key;
  hoverable?: boolean;
};

type Address = {
  country: string;
  city: string;
  postcode: string;
  address_line_1: string;
  address_line_2: string;
};

const CommunitiesCard = ({ fragmentRef }: Props) => {
  const [imageBlob, setImageBlob] = useState<Blob>(new Blob());

  const navigation = useNavigate();

  const community = useFragment(communitiesCardFragmentQuery, fragmentRef);

  useEffect(() => {
    if (community.image) {
      fetchFromStorage(community.image, 'communities-images').then((blob) =>
        setImageBlob(blob ?? imageBlob)
      );
    }
  }, [community]);

  const address: Address = JSON.parse(community.address);
  const formattedAddress = `${address.country}, ${address.city}, ${address.address_line_1}, ${address.address_line_2}, ${address.postcode}`;

  return (
    <GeneralCard
      name={community.name}
      description={formattedAddress}
      imageBlob={imageBlob}
      onClick={() => navigation(`${community.id}`)}
      hasAvatar={false}
    />
  );
};

export default CommunitiesCard;
