import graphql from 'babel-plugin-relay/macro';
import { useEffect, useState } from 'react';
import { useFragment } from 'react-relay';

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

const CommunitiesCard = ({ fragmentRef }: Props) => {
  const [imageBlob, setImageBlob] = useState<Blob>(new Blob());

  const community = useFragment(communitiesCardFragmentQuery, fragmentRef);

  useEffect(() => {
    fetchFromStorage(community.image, 'communities-images').then((blob) =>
      setImageBlob(blob ?? imageBlob)
    );
  }, [community]);

  return (
    <GeneralCard
      name={community.name}
      description={community.address}
      imageBlob={imageBlob}
      onClick={() => {
        console.log('clicked');
      }}
    />
  );
};

export default CommunitiesCard;
