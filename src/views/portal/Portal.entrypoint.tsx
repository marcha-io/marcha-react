// src/views/portal/Portal.entrypoint.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

import PortalLayout from '../../components/portal/PortalLayout';

const Portal = (): React.ReactElement => {
  const { communityId } = useParams<{ communityId: string }>();

  if (!communityId) {
    // This should ideally not happen due to the routing structure
    // but it's good practice to handle it.
    return <div>Community not found. Please select a community.</div>;
  }

  return <PortalLayout communityId={communityId} />;
};

export default Portal;
