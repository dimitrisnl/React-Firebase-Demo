import React, { Component } from 'react';

import { Form, Input, Button, Card, message } from 'components/Ant';
import { withFirebase } from 'components/Firebase';

const INITIAL_STATE = {
  passwordOld: '',
  passwordNew: '',
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOld, passwordNew } = this.state;
    const { doPasswordUpdate, doReauthenticateUser } = this.props.firebase;
    doReauthenticateUser(passwordOld)
      .then(() => doPasswordUpdate(passwordNew))
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        message.success('Password successfully updated');
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
    const { passwordOld, passwordNew } = this.state;

    const isInvalid = passwordNew === '' || passwordOld === '';

    return (
      <Card title="Change Password" style={{ height: '100%' }}>
        <Form onSubmit={this.onSubmit}>
          <Form.Item>
            <Input.Password
              name="passwordOld"
              value={passwordOld}
              onChange={this.onChange}
              type="password"
              placeholder="Current Password"
            />
          </Form.Item>
          <Form.Item>
            <Input.Password
              name="passwordNew"
              value={passwordNew}
              onChange={this.onChange}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Button disabled={isInvalid} htmlType="submit">
            Update Password
          </Button>
        </Form>
      </Card>
    );
  }
}

export default withFirebase(PasswordChangeForm);
