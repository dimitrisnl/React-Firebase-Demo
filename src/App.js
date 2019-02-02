import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import LandingPage from 'pages/landing';
import PasswordForgetPage from 'pages/password-forget';
import ActivitiesPage from 'pages/activities';
import AccountPage from 'pages/account';
import CalendarPage from 'pages/calendar';
import UsersPage from 'pages/users';

import { Layout } from 'components/Ant';
import Navigation from 'components/Navigation';
import Weather from 'components/Weather';
import { withAuthentication } from 'components/Session';

import * as ROUTES from 'constants/routes';

const { Header, Content, Sider } = Layout;

const App = () => (
  <Router>
    <Switch>
      {/* Authenticated */}
      <Route path="/app">
        <Layout id="dashboard-view">
          <Sider>
            <div className="brand">Dashboard in React</div>
            <Navigation />{' '}
          </Sider>
          <Layout >
            <Header>
              <Weather />
            </Header>
            <Content>
              <div className="container">
                <Route path={ROUTES.HOME} component={ActivitiesPage} />
                <Route path={ROUTES.USERS} component={UsersPage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.CALENDAR} component={CalendarPage} />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Route>

      {/* Non-authenticated */}
      <Route path="/">
        <Layout>
          <Header
            style={{
              background: '#fff',
              padding: '0 24px',
              textAlign: 'center',
              fontSize:'18px'
            }}
          >
            <Link to="/">Dashboard in React</Link>
          </Header>
          <Content>
            <div className="container">
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route
                path={ROUTES.PASSWORD_FORGET}
                component={PasswordForgetPage}
              />
            </div>
          </Content>
        </Layout>
      </Route>
    </Switch>
  </Router>
);

export default withAuthentication(App);
