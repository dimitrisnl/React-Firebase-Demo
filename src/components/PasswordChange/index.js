import React, { Component } from 'react';

import { Form, Input, Button, Card, message } from 'components/Ant';
import { withFirebase } from 'components/Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <Card title="Change Password" style={{ height: '100%' }}>
        <Form onSubmit={this.onSubmit}>
          <Form.Item>
            <Input
              name="passwordOne"
              value={passwordOne}
              onChange={this.onChange}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item>
            <Input
              name="passwordTwo"
              value={passwordTwo}
              onChange={this.onChange}
              type="password"
              placeholder="Confirm New Password"
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
