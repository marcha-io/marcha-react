import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import { useCommunity } from '../../contexts/CommunityContext';
import { Paths } from '../../views/paths';
import CommunityCard from './CommunityCard';
import { CommunityCardContainer_query$key } from './__generated__/CommunityCardContainer_query.graphql';

const CommunityCardContainerFragment = graphql`
  fragment CommunityCardContainer_query on Query {
    communityUsersCollection(filter: { status: { eq: ACCEPTED } }) {
      edges {
        node {
          ...CommunityCard_fragment
        }
      }
    }
  }
`;

type Props = {
  fragmentRef: CommunityCardContainer_query$key;
};

const CommunityCardContainer = ({ fragmentRef }: Props): React.ReactElement => {
  const data = useFragment(CommunityCardContainerFragment, fragmentRef);
  const { setCommunityId, setCommunityImg } = useCommunity();

  const navigate = useNavigate();

  const handleSelectCommunity = (id: string, imageBlob: Blob | null) => {
    setCommunityId(id);
    setCommunityImg(imageBlob != null ? URL.createObjectURL(imageBlob) : null);
    navigate(`${Paths.Portal}/${id}/${Paths.Dashboard}`);
  };

  return (
    <>
      {data.communityUsersCollection?.edges.map(({ node }) => {
        return (
          <CommunityCard
            fragmentRef={node}
            handleSelectCommunity={handleSelectCommunity}
          />
        );
      })}
    </>
  );
};

export default CommunityCardContainer;
