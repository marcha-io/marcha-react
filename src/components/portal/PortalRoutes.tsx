import { Content } from 'antd/es/layout/layout';
import { Navigate, Route, Routes } from 'react-router-dom';

import { RADIUS_MD, WHITE } from '../../design';
import Dashboard from '../../views/dashboard/Dashboard.entrypoint';
import EventDetail from '../../views/events/EventDetail.entrypoint';
import Events from '../../views/events/Events.entrypoint';
import CreateListing from '../../views/market/CreateListing.entrypoint';
import Market from '../../views/market/Market.entrypoint';
import MyListings from '../../views/market/MyListings.entrypoint';
import ProductDetail from '../../views/market/Product.entrypoint';
import Noticeboard from '../../views/noticeboard/Noticeboard.entrypoint';
import { Paths } from '../../views/paths';
import Profile from '../../views/profile/Profile.entrypoint';
import MarketplaceHeader from '../marketplace/MarketplaceHeader';

/**
 * Shared route definitions used by both mobile and desktop layouts.
 *
 * All paths here are relative to the parent `/portal/:communityId/*` route.
 * React Router v6 matches routes by specificity: static segments beat dynamic
 * segments, so `market/new` always wins over `market/:product_id`.
 *
 * The index route redirects the bare `/portal/:communityId` URL to the
 * dashboard so users always land on a meaningful page.
 */

const PortalRoutes = () => (
  <Content
    style={{
      padding: 24,
      margin: 0,
      minHeight: 280,
      background: WHITE,
      borderRadius: RADIUS_MD,
    }}
  >
    <Routes>
      <Route index element={<Navigate to={Paths.Dashboard} replace />} />

      <Route path={Paths.Dashboard} element={<Dashboard />} />
      <Route
        path={Paths.Documents}
        element={<div>Documents - Coming Soon</div>}
      />
      <Route
        path={Paths.Maintenance}
        element={<div>Maintenance - Coming Soon</div>}
      />
      <Route
        path={Paths.ServiceCharges}
        element={<div>Service Charges - Coming Soon</div>}
      />
      <Route
        path={Paths.Messages}
        element={<div>Messages - Coming Soon</div>}
      />
      <Route path={Paths.Community} element={<Noticeboard />} />

      <Route path={Paths.Events} element={<Events />} />
      <Route path={`${Paths.Events}/:eventId`} element={<EventDetail />} />

      <Route path={Paths.Market} element={<MarketplaceHeader />}>
        <Route index element={<Market />} />
        <Route path={'new'} element={<CreateListing />} />
        <Route path={'my-listings'} element={<MyListings />} />
        <Route path={':product_id'} element={<ProductDetail />} />
      </Route>

      <Route
        path={Paths.Subletting}
        element={<div>Subletting - Coming Soon</div>}
      />
      <Route path={Paths.Profile} element={<Profile />} />
      <Route
        path={Paths.Notifications}
        element={<div>Notifications - Coming Soon</div>}
      />
    </Routes>
  </Content>
);

export default PortalRoutes;
