import { Col, Image, Menu, MenuProps, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import UserSignUpIcon from './UserSignUpIcon';

const items: MenuProps['items'] = [
  {
    key: 'logo',
    label: (
      <Link rel="noopener noreferrer" to="/">
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
    key: 'communities',
    label: (
      <Link rel="noopener noreferrer" to="/communities">
        Communities
      </Link>
    ),
  },
  {
    key: 'feed',
    label: (
      <Link rel="noopener noreferrer" to="/feed">
        Feed
      </Link>
    ),
  },
];

const Navbar = (): React.ReactElement => {
  const [selectedKey, setSelectedKey] = useState('logo');

  return (
    <Header>
      <Row>
        <Col span={20}>
          <Menu
            mode="horizontal"
            selectedKeys={[selectedKey]}
            onSelect={(item) => setSelectedKey(item.key)}
            items={items}
          />
        </Col>
        <Col offset={3} span={1}>
          <UserSignUpIcon />
        </Col>
      </Row>
    </Header>
  );
};

export default Navbar;
