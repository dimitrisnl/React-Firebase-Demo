import React from 'react';

import { Button } from 'components/Ant';
import { withFirebase } from 'components/Firebase';

const SignOutButton = ({ firebase }) => (
  <Button
  block
    ghost
    icon="logout"
    type="danger"
    htmlType="button"
    onClick={firebase.doSignOut}
  >
    Sign out
  </Button>
);

export default withFirebase(SignOutButton);
