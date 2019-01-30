import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import {
  Button,
  Input,
  Form,
  Icon,
  Checkbox,
  message,
  Row,
  Col,
} from 'components/Ant';
import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';
import { PasswordForgetLink } from 'pages/password-forget';

const SignInPage = () => <SignInForm />;

const INITIAL_STATE = {
  email: '',
  password: '',
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const { email, password } = this.state;

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
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Row type="flex" justify="space-between">
            <Col>
              <Checkbox>Remember me</Checkbox>
            </Col>
            <Col>
              <PasswordForgetLink />
            </Col>
          </Row>
        </Form.Item>

        <Button disabled={isInvalid} type="primary" htmlType="submit">
          Sign In
        </Button>
      </Form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
