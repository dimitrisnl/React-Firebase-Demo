import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Form, Input, Button, Card, message } from 'components/Ant';
import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';

const INITIAL_STATE = {
  password: '',
};

class AccountDeletionBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    const { password } = this.state;
    const { doReauthenticateUser, doDeleteUser } = this.props.firebase;

    doReauthenticateUser(password)
      .then(doDeleteUser)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        message.success('Account successfully deleted');
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        message.error(error.message);
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { password } = this.state;

    return (
      <Card title="Change Password" style={{ height: '100%' }}>
        <Form onSubmit={this.onSubmit}>
          <Form.Item>
            <Input.Password
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Button ghost type="danger" disabled={!password} htmlType="submit">
            Delete Account
          </Button>
        </Form>
      </Card>
    );
  }
}

const AccountDeletionForm = compose(
  withRouter,
  withFirebase
)(AccountDeletionBase);

export default withFirebase(AccountDeletionForm);
