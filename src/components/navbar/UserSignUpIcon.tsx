import { UserOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Link rel="noopener noreferrer" to="/sign_in">
        Sign In
      </Link>
    ),
  },
  {
    key: '2',
    label: (
      <Link rel="noopener noreferrer" to="/sign_up">
        Sign Up
      </Link>
    ),
  },
];

const UserSignUpIcon = (): React.ReactElement => {
  return (
    <Dropdown menu={{ items }} placement="bottom">
      <UserOutlined style={{ fontSize: 18 }} />
    </Dropdown>
  );
};

export default UserSignUpIcon;
