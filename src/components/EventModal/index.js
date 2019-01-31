import React, { Component } from 'react';
import { Modal, Input, Icon, Form, DatePicker, Button } from 'components/Ant';

const INITIAL_STATE = {
  id: null,
  date: null,
  title: '',
};

class EventModal extends Component {
  state = { ...INITIAL_STATE };

  componentWillReceiveProps(nextProps) {
    const { id = null, date = null, title = '' } = nextProps.event
      ? nextProps.event
      : {};
    this.setState({ id, date, title });
  }

  onDateChange = date => this.setState({ date });
  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();
    const { date, title } = this.state;
    if (!!date && title.trim() !== '') {
      this.props.onOk({
        date,
        title,
        id: this.state.id || +new Date(), // well, it's a demo..
      });
    }
  };

  resetState = () => this.setState({ ...INITIAL_STATE });

  render() {
    const { date, title } = this.state;
    const { action, onOk, onCancel, isModalVisible } = this.props;

    const isInvalid = !date || title.trim() === '';

    return (
      <Modal
        title={`${action} event`}
        visible={isModalVisible}
        onOk={onOk}
        onCancel={onCancel}
        maskClosable={false}
        footer={null}
        afterClose={this.resetState}
      >
        <Form onSubmit={this.onSubmit}>
          <Form.Item>
            <Input
              suffix={
                <Icon type="font-size" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              name="title"
              value={title}
              type="text"
              placeholder="Event title"
              onChange={this.onInputChange}
            />
          </Form.Item>
          <Form.Item>
            <DatePicker
              value={date}
              onChange={this.onDateChange}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button type="danger" ghost onClick={this.props.onCancel}>
              Cancel
            </Button>
            <Button
              style={{ marginLeft: '8px' }}
              type="primary"
              htmlType="submit"
              disabled={isInvalid}
            >{`${action} event`}</Button>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default EventModal;
