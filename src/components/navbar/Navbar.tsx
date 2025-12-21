import { Col, Image, Menu, MenuProps, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Paths } from '../../views/paths';
import UserSignUpIcon from './UserSignUpIcon';

const items: MenuProps['items'] = [
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
    key: Paths.Communities,
    label: (
      <Link rel="noopener noreferrer" to={Paths.Communities}>
        Communities
      </Link>
    ),
  },
  {
    key: Paths.Feed,
    label: (
      <Link rel="noopener noreferrer" to={Paths.Feed}>
        Feed
      </Link>
    ),
  },
];

type Props = {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({
  isUserLoggedIn,
  setIsUserLoggedIn,
}: Props): React.ReactElement => {
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
            items={items}
          />
        </Col>
        <Col offset={3} span={1}>
          <UserSignUpIcon
            isUserLoggedIn={isUserLoggedIn}
            setIsUserLoggedIn={setIsUserLoggedIn}
          />
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
