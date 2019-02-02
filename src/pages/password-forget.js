import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { Card, Row, Col, Button, Form, Input, message } from 'components/Ant';
import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';

const INITIAL_STATE = {
  email: '',
  loading: false,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;
    this.setState({ loading: true });

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        message.success('Instructions sent to your email.');
        this.props.history.push(ROUTES.LANDING);
        this.setState({ ...INITIAL_STATE });
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
    const { email, loading } = this.state;

    const isInvalid = email === '';

    return (
      <Row type="flex" justify="center">
        <Col xs={24} md={11}>
          <Card>
            <Form onSubmit={this.onSubmit}>
              <Form.Item>
                <Input
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Email Address"
                />
              </Form.Item>
              <Button
                loading={loading}
                type="primary"
                disabled={isInvalid}
                htmlType="submit"
              >
                Reset My Password
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const PasswordForgetLink = () => (
  <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
);

const PasswordForgetForm = compose(
  withRouter,
  withFirebase
)(PasswordForgetFormBase);

export default PasswordForgetForm;

export { PasswordForgetForm, PasswordForgetLink };
