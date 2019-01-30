import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import LandingPage from 'pages/landing';
import PasswordForgetPage from 'pages/password-forget';
import ActivitiesPage from 'pages/activities';
import AccountPage from 'pages/account';
import CalendarPage from 'pages/calendar';
import UsersPage from 'pages/users';

import { Layout } from 'components/Ant';
import Navigation from 'components/Navigation';
import { withAuthentication } from 'components/Session';

import * as ROUTES from 'constants/routes';

const { Header, Content, Footer } = Layout;

const App = () => (
  <Router>
    <Layout>
      <Header>
        <div className="container">
          <div className="brand">React w/ Firebase Example</div>
          <Navigation />
        </div>
      </Header>
      <Content>
        <div className="container">
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={ActivitiesPage} />
          <Route path={ROUTES.USERS} component={UsersPage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.CALENDAR} component={CalendarPage} />
        </div>
      </Content>
      <Footer>React w/ Firebase Example</Footer>
    </Layout>
  </Router>
);

export default withAuthentication(App);
