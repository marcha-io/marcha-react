import { UserOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import LogOutNavbar from './LogOutNavbar';

const loggedInItems = (
  setIsUserLoggedIn: (val: boolean) => void
): MenuProps['items'] => {
  return [
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
      label: <LogOutNavbar setIsUserLoggedIn={setIsUserLoggedIn} />,
    },
  ];
};

type Props = {
  setIsUserLoggedIn: (val: boolean) => void;
};

const UserSignUpIcon = ({ setIsUserLoggedIn }: Props): React.ReactElement => {
  const items = loggedInItems(setIsUserLoggedIn);

  return (
    <Dropdown menu={{ items }} placement="bottom">
      <UserOutlined style={{ fontSize: 18 }} />
    </Dropdown>
  );
};

export default UserSignUpIcon;
