import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Form, Input, Button, Icon, message } from 'components/Ant';
import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  loading: false,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.setState({ loading: true });

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        message.error(error.message);
        this.setState({ loading: false });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { email, password, loading } = this.state;

    const isInvalid = password === '' || email === '';
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Item>
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Button
          loading={loading}
          type="primary"
          disabled={isInvalid}
          htmlType="submit"
        >
          Sign up
        </Button>
      </Form>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpForm;
