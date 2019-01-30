import React from 'react';

import { AuthUserContext, withAuthorization } from 'components/Session';
import PasswordChangeForm from 'components/PasswordChange';
import AccountDeletionForm from 'components/AccountDeletion';

import { Row, Col } from 'components/Ant';

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
            <AccountDeletionForm />
          </Col>
        </Row>
      </>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
