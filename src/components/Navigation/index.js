import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as ROUTES from 'constants/routes';
import { Menu } from 'components/Ant';
import { AuthUserContext } from 'components/Session';
import SignOutButton from 'components/SignOut';

class NavigationAuthBase extends PureComponent {
  constructor(props) {
    super(props);
    const { pathname } = props.location;
    const cleanPathnane = pathname.replace(/\//g, '');
    this.state = {
      active: cleanPathnane,
    };
  }

  handleClick = e => {
    this.setState({
      active: e.key,
    });
  };

  render() {
    return (
      <Menu
        mode="horizontal"
        theme="dark"
        onClick={this.handleClick}
        selectedKeys={[this.state.active]}
      >
        <Menu.Item key="activities">
          <Link to={ROUTES.HOME}>Activities</Link>
        </Menu.Item>
        <Menu.Item key="users">
          <Link to={ROUTES.USERS}>Users</Link>
        </Menu.Item>
        <Menu.Item key="calendar">
          <Link to={ROUTES.CALENDAR}>Calendar</Link>
        </Menu.Item>
        <Menu.Item key="account">
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </Menu.Item>

        <Menu.Item className="pull-right">
          <div>
            <SignOutButton />
          </div>
        </Menu.Item>
      </Menu>
    );
  }
}

const NavigationAuth = withRouter(NavigationAuthBase);

const NavigationNonAuth = () => null;

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

export default Navigation;
