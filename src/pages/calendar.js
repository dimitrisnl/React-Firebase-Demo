import React, { Component } from 'react';
import moment from 'moment';
import { withAuthorization } from 'components/Session';
import { Card, BackTop, Calendar, Button, Popover } from 'components/Ant';
import EventModal from 'components/EventModal';

const EVENT_STYLE = {
  background: '#52c41a70',
  height: '16px',
  marginBottom: '4px',
  borderRadius: '3px',
  borderLeft: '3px solid #46a219',
  fontSize: '11px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  paddingLeft: '3px',
  zIndex: 2,
};

const EVENTS = [
  { id: 1, date: moment(), title: 'Add more events!' },
  { id: 2, date: moment(), title: 'Add more events!' },
  { id: 3, date: moment().subtract(1, 'days'), title: 'Add more events!' },
  { id: 4, date: moment().subtract(3, 'days'), title: 'Add more events!' },
  { id: 5, date: moment().subtract(3, 'days'), title: 'Add more events!' },
  { id: 6, date: moment().subtract(4, 'days'), title: 'Add more events!' },
  { id: 7, date: moment().subtract(7, 'days'), title: 'Add more events!' },
  { id: 8, date: moment().add(2, 'days'), title: 'Add more events!' },
  { id: 9, date: moment().add(2, 'days'), title: 'Add more events!' },
  { id: 10, date: moment().add(5, 'days'), title: 'Add more events!' },
  { id: 11, date: moment().add(7, 'days'), title: 'Add more events!' },
  { id: 12, date: moment().subtract(12, 'days'), title: 'Add more events!' },
  { id: 13, date: moment().subtract(14, 'days'), title: 'Add more events!' },
];

const INITIAL_STATE = {
  isModalVisible: false,
  action: 'Add',
  activeEvent: null,
  events: [...EVENTS],
};

class CalendarPage extends Component {
  state = { ...INITIAL_STATE };

  onSelect = value => {
    this.setState({
      isModalVisible: true,
      activeEvent: {
        date: value,
        title: '',
      },
    });
  };

  onModalClose = () =>
    this.setState({ activeEvent: null, action: 'Add', isModalVisible: false });

  onModalAction = updatedEvent => {
    const events = this.state.events.filter(
      event => event.id !== updatedEvent.id
    );

    this.setState({ events: [...events, updatedEvent] });
    this.onModalClose();
  };

  onDeleteEvent = id =>
    this.setState({
      events: this.state.events.filter(event => event.id !== id),
    });

  onEditEvent = event => {
    this.setState({
      isModalVisible: true,
      action: 'Edit',
      activeEvent: { ...event },
    });
  };

  dateCellRender = value => {
    const { events } = this.state;
    return events
      .filter(event => event.date.isSame(value, 'day'))
      .map(event => (
        <Popover
          title={event.title}
          content={
            <>
              <Button.Group>
                <Button
                  onClick={e =>
                    e.stopPropagation() & this.onDeleteEvent(event.id)
                  }
                >
                  Delete
                </Button>

                <Button
                  onClick={e => e.stopPropagation() & this.onEditEvent(event)}
                >
                  Edit
                </Button>
              </Button.Group>
            </>
          }
          key={event.id}
        >
          <div style={EVENT_STYLE}>{event.title}</div>
        </Popover>
      ));
  };

  render() {
    const { isModalVisible, activeEvent, action } = this.state;
    return (
      <>
        <BackTop />
        <h2>Calendar</h2>
        <p>
          Add & Edit events. These are <b>not</b> persisted in Firebase.
        </p>
        <Button
          onClick={() =>
            this.setState({
              isModalVisible: true,
              action: 'Add',
              activeEvent: null,
            })
          }
          icon="plus"
          type="primary"
          style={{ margin: '8px 0 16px' }}
        >
          Add new event
        </Button>

        <EventModal
          isModalVisible={isModalVisible}
          action={action}
          event={activeEvent}
          onOk={this.onModalAction}
          onCancel={this.onModalClose}
        />

        <Card>
          <Calendar
            dateCellRender={this.dateCellRender}
            onSelect={this.onSelect}
          />
        </Card>
      </>
    );
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(CalendarPage);
