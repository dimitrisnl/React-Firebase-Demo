import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from 'constants/routes';
import { Menu } from 'components/Ant';
import { AuthUserContext } from 'components/Session';
import SignOutButton from 'components/SignOut';

const NavigationAuth = () => (
  <Menu mode="horizontal" theme="dark">
    <Menu.Item>
      <Link to={ROUTES.HOME}>Activities</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ROUTES.USERS}>Users</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ROUTES.CALENDAR}>Calendar</Link>
    </Menu.Item>
    <Menu.Item>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </Menu.Item>

    <Menu.Item className="pull-right">
      <div>
        <SignOutButton />
      </div>
    </Menu.Item>
  </Menu>
);

const NavigationNonAuth = () => null;

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

export default Navigation;
