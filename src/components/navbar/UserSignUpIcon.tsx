import { UserOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd/lib';
import React from 'react';
import { Link } from 'react-router-dom';

import LogOutNavbar from './LogOutNavbar';

const loggedOutItems: MenuProps['items'] = [
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

const loggedInItems = (
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
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
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserSignUpIcon = ({
  isUserLoggedIn,
  setIsUserLoggedIn,
}: Props): React.ReactElement => {
  const items = isUserLoggedIn
    ? loggedInItems(setIsUserLoggedIn)
    : loggedOutItems;

  return (
    <Dropdown menu={{ items }} placement="bottom">
      <UserOutlined style={{ fontSize: 18 }} />
    </Dropdown>
  );
};

export default UserSignUpIcon;
