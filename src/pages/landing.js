import React from 'react';

import { Tabs, Card, Row, Col } from 'components/Ant';
import SignInForm from 'components/SignIn';
import SignUpForm from 'components/SignUp';

const TabPane = Tabs.TabPane;

const LandingPage = () => (
  <Row type="flex" justify="center">
    <Col xs={24} md={11}>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Sign in" key="1">
            <SignInForm />
          </TabPane>
          <TabPane tab="Sign up" key="2">
            <SignUpForm />
          </TabPane>
        </Tabs>
      </Card>
    </Col>
  </Row>
);

export default LandingPage;
