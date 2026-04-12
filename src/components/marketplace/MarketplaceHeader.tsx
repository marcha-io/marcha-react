import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { useCallback } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

import { Paths } from '../../views/paths';
import MarketplaceFilters from './MarketplaceFilters';
import MarketplaceHero from './MarketplaceHero';

const MarketplaceHeader = () => {
  const navigate = useNavigate();
  const { communityId } = useParams<{ communityId: string }>();
  const location = useLocation();

  const basePath = `/portal/${communityId}`;

  const isMarketIndex = location.pathname.endsWith(`/${Paths.Market}`);

  const navigateToNewListing = useCallback(
    () => navigate(`${basePath}/${Paths.Market}/new`),
    [navigate, basePath]
  );

  const navigateToMyListings = useCallback(
    () => navigate(`${basePath}/${Paths.Market}/my-listings`),
    [navigate, basePath]
  );

  return isMarketIndex ? (
    <Flex vertical>
      <MarketplaceHero
        onPostListing={navigateToNewListing}
        onMyListings={navigateToMyListings}
      />
      <MarketplaceFilters />
      <Outlet />
    </Flex>
  ) : (
    <div>
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(`/portal/${communityId}/${Paths.Market}`)}
        style={{ marginBottom: 16, paddingLeft: 0 }}
      >
        Back to Marketplace
      </Button>
      <Outlet />
    </div>
  );
};

export default MarketplaceHeader;
