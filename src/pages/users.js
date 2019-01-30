import React, { PureComponent } from 'react';
import { withAuthorization } from 'components/Session';
import { Card, BackTop, Table, Icon, Avatar } from 'components/Ant';

import request from 'utils/request';
import * as ENDPOINTS from 'constants/endpoints';

const columns = [
  {
    title: '',
    dataIndex: 'picture',
    key: 'picture',
    render: picture => <Avatar src={picture} />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: gender => <Icon type={gender} />,
    onFilter: (value, record) => record.gender === value,
    filters: [
      {
        text: 'Male',
        value: 'man',
      },
      {
        text: 'Female',
        value: 'woman',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'location',
    key: 'location',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
];

class UsersPage extends PureComponent {
  state = {
    loading: false,
    users: [],
  };

  fetchUsers = () => {
    this.setState({ loading: true });
    request(ENDPOINTS.USERS, { method: 'GET' }).then(({ results }) => {
      const users = results.map(user => ({
        key: user.login.uuid,
        age: user.dob.age,
        phone: user.phone,
        email: user.email,
        name: user.name.first + ' ' + user.name.last,
        picture: user.picture.thumbnail,
        gender: user.gender === 'male' ? 'man' : 'woman',
        location: user.location.street + ', ' + user.location.city,
      }));
      this.setState({ users, loading: false });
    });
  };

  componentDidMount() {
    this.fetchUsers();
  }

  render() {
    const { loading, users } = this.state;
    return (
      <>
        <BackTop />
        <h2>Users</h2>
        <p>
          Let's display some users using{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://randomuser.me/"
          >
            https://randomuser.me/
          </a>
        </p>

        <Card>
          <Table
            rowKey={user => user.key}
            loading={loading}
            columns={columns}
            dataSource={users}
            size="middle"
          />
        </Card>
      </>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(UsersPage);
