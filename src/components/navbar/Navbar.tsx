import { Col, Image, Menu, MenuProps, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { CommunityContext } from '../../App';
import { supabase } from '../../lib/supabase';
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
    key: communityId,
    label: (
      <Link rel="noopener noreferrer" to={communityId}>
        Home
      </Link>
    ),
  },
  {
    key: Paths.Market,
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

const Navbar = (): React.ReactElement => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsUserLoggedIn(data.user != null);
    });
  }, [setIsUserLoggedIn]);

  const communityContext = useContext(CommunityContext);

  const menuItems =
    isUserLoggedIn && communityContext?.communitySelected
      ? loggedInMenu(communityContext.communitySelected)
      : loggedOutMenu;

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
          <Menu
            mode="horizontal"
            selectedKeys={[useLocation().pathname]}
            items={menuItems}
          />
        </Col>
        {isUserLoggedIn && (
          <Col offset={3} span={1}>
            <UserSignUpIcon setIsUserLoggedIn={setIsUserLoggedIn} />
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default Navbar;
