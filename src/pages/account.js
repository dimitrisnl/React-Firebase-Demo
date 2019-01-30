import React from 'react';

import { AuthUserContext, withAuthorization } from 'components/Session';
import PasswordChangeForm from 'components/PasswordChange';
import { Row, Col, Popconfirm, Icon, Card, Button } from 'components/Ant';

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <>
        <h2>Account: {authUser.email}</h2>
        <Row gutter={16} type="flex">
          <Col xs={24} md={12} style={{ margin: '8px 0' }}>
            <PasswordChangeForm />
          </Col>
          <Col xs={24} md={12} style={{ margin: '8px 0' }}>
            <Card title="Dangerous Zone">
              <Popconfirm
                title="Proceed with deleting my account"
                icon={
                  <Icon type="exclamation-circle" style={{ color: 'red' }} />
                }
              >
                <Button ghost type="danger">
                  Delete Account
                </Button>
              </Popconfirm>
            </Card>
          </Col>
        </Row>
      </>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
