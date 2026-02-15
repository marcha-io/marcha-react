import { Col, Image, Menu, MenuProps, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { useContext, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

import { CommunityContext } from '../../App';
import { Paths } from '../../views/paths';
import UserSignUpIcon from './UserSignUpIcon';

const loggedInMenu = (communityId: string): MenuProps['items'] => [
  {
    key: Paths.Main,
    label: (
      <Link rel="noopener noreferrer" to={Paths.Main}>
        <Image
          src="/assets/marcha_logo.png"
          preview={false}
          height={50}
          width={150}
        />
      </Link>
    ),
  },
  {
    key: 'divider',
    type: 'divider',
  },
  {
    key: `/${communityId}`,
    label: (
      <Link rel="noopener noreferrer" to={communityId}>
        Home
      </Link>
    ),
  },
  {
    key: `/${communityId}/${Paths.Market}`,
    label: (
      <Link rel="noopener noreferrer" to={`${communityId}/${Paths.Market}`}>
        Market
      </Link>
    ),
  },
];

const loggedOutMenu: MenuProps['items'] = [
  {
    key: Paths.Main,
    label: (
      <Link rel="noopener noreferrer" to={Paths.Main}>
        <Image
          src="/assets/marcha_logo.png"
          preview={false}
          height={50}
          width={150}
        />
      </Link>
    ),
  },
];

const getCommunityIdFromPath = (pathname: string) => {
  const firstSlashIndex = pathname.indexOf('/');
  if (firstSlashIndex == -1) {
    return null;
  }

  const secondSlashIndex = pathname.substring(firstSlashIndex + 1).indexOf('/');
  if (secondSlashIndex != -1) {
    return pathname.substring(
      firstSlashIndex + 1,
      secondSlashIndex + (firstSlashIndex + 1)
    );
  }

  return pathname.substring(firstSlashIndex + 1);
};

const Navbar = (): React.ReactElement => {
  const pathname = useLocation().pathname;
  const communityContext = useContext(CommunityContext);

  const community_id = getCommunityIdFromPath(pathname);

  const menuItems = useMemo(() => {
    return communityContext.isUserLoggedIn && community_id
      ? loggedInMenu(community_id)
      : loggedOutMenu;
  }, [communityContext.isUserLoggedIn, community_id]);

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
      }}
    >
      <Row>
        <Col span={20}>
          <Menu mode="horizontal" selectedKeys={[pathname]} items={menuItems} />
        </Col>
        {communityContext.isUserLoggedIn && (
          <Col offset={3} span={1}>
            <UserSignUpIcon
              setIsUserLoggedIn={communityContext.setIsUserLoggedIn}
            />
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default Navbar;
