import { Col, Image, Menu, MenuProps, Row } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Paths } from '../../views/paths';

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
  const pathname = useLocation().pathname;

  const menuItems = useMemo(() => {
    return loggedOutMenu;
  }, []);

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
      </Row>
    </Header>
  );
};

export default Navbar;
