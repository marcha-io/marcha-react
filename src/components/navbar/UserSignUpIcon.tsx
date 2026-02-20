import { UserOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import LogOutNavbar from './LogOutNavbar';

const loggedInItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link rel="noopener noreferrer" to="/">
        Dashboard
      </Link>
    ),
  },
  {
    key: '2',
    label: <LogOutNavbar />,
  },
];

const UserSignUpIcon = (): React.ReactElement => {
  return (
    <Dropdown menu={{ items: loggedInItems }} placement="bottom">
      <UserOutlined style={{ fontSize: 18 }} />
    </Dropdown>
  );
};

export default UserSignUpIcon;
