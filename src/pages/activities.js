import React, { Component } from 'react';

import { withAuthorization } from 'components/Session';
import {
  Card,
  Col,
  Row,
  Divider,
  BackTop,
  Tag,
  Button,
  Icon,
  Checkbox,
} from 'components/Ant';

import request from 'utils/request';
import * as ENDPOINTS from 'constants/endpoints';

class ActivitiesPage extends Component {
  state = {
    loading: false,
    count: 0,
    activities: [],
    done: [],
  };

  getActivity = () => {
    this.setState({ loading: true });
    request(ENDPOINTS.ACTIVITY, { method: 'GET' }).then(activity =>
      this.setState({
        count: this.state.count + 1,
        loading: false,
        activities: [
          ...this.state.activities,
          { ...activity, id: this.state.count, checked: false },
        ],
      })
    );
  };

  updateActivity = id => {
    const { activities } = this.state;

    const activityObj = activities.find(activity => activity.id === id);

    const updated = [
      ...activities.slice(0, id),
      { ...activityObj, checked: !activityObj.checked },
      ...activities.slice(id + 1),
    ];

    this.setState({ activities: updated });
  };

  componentDidMount() {
    this.getActivity();
  }

  render() {
    const { loading, activities } = this.state;
    return (
      <>
        <BackTop />
        <h2>Activities Page</h2>
        <p>
          Let's generate some activities using{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.boredapi.com/"
          >
            https://www.boredapi.com/
          </a>
        </p>
        <Button
          icon="experiment"
          type="primary"
          loading={loading}
          onClick={this.getActivity}
          style={{ margin: '8px 0' }}
        >
          Get new activity
        </Button>
        <Row gutter={16} type="flex">
          {activities.map(activity => (
            <Col key={activity.id} xs={24} md={12} style={{ margin: '8px 0' }}>
              <Card
                style={{
                  height: '100%',
                }}
                title={
                  activity.checked ? (
                    <del>{activity.activity}</del>
                  ) : (
                    activity.activity
                  )
                }
                extra={
                  <Checkbox onChange={() => this.updateActivity(activity.id)} />
                }
              >
                <Tag>
                  {' '}
                  <Icon type="star" /> {activity.type}
                </Tag>
                <Tag>
                  {activity.participants === 1 ? (
                    <span>
                      <Icon type="user" /> Single
                    </span>
                  ) : (
                    <span>
                      <Icon type="team" /> Team
                    </span>
                  )}
                </Tag>
                <Tag>
                  {activity.price === 0 ? (
                    'Free'
                  ) : (
                    <>
                      <Icon type="dollar" /> {activity.price}
                    </>
                  )}
                </Tag>
              </Card>{' '}
            </Col>
          ))}
        </Row>
        <Divider />
      </>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ActivitiesPage);
