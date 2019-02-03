import React, { Component } from 'react';

import request from 'utils/request';
import { Icon, Row, Col } from 'components/Ant';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const getWeatherIcon = code => `http://openweathermap.org/img/w/${code}.png`;

const getWeatherMetaPath = ({ lat, lng }) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${API_KEY}&units=metric`;

class Weather extends Component {
  state = {
    loading: false,
    weatherObj: null,
    endpoint: '',
  };

  componentDidMount() {
    this.setState({ loading: true });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lng = position.coords.longitude;
          const lat = position.coords.latitude;
          const endpoint = getWeatherMetaPath({ lat, lng });
          this.setState({ endpoint, loading: false }, this.getWeather);
        },
        () => this.setState({ loading: false })
      );
    } else {
      this.setState({ loading: false });
    }
  }

  getWeather = () => {
    const { endpoint } = this.state;
    request(endpoint, { method: 'GET' }).then(weatherObj =>
      this.setState({ weatherObj })
    );
  };

  prepareWeatherImg = ({ name, weather, temp }) => {
    return (
      <Row type="flex" justify="center">
        <Col>
          {' '}
          <small>{name}</small>
        </Col>
        <Col>
          <img
            alt={weather[0].description}
            src={getWeatherIcon(weather[0].icon)}
          />
        </Col>
        <Col>
          {' '}
          <small>{temp}℃</small>
        </Col>
      </Row>
    );
  };

  render() {
    const { weatherObj, loading } = this.state;

    if (loading) {
      return (
        <Row type="flex" justify="center" align="middle">
          <Col>
            <Icon
              type="loading-3-quarters"
              spin
              style={{ marginRight: '8px' }}
            />
          </Col>
          <Col>
            <small>Attempting to fetch weather</small>
          </Col>
        </Row>
      );
    }

    if (!weatherObj) {
      return null;
    }

    const {
      weather,
      name,
      main: { temp },
    } = weatherObj;

    return this.prepareWeatherImg({ name, weather, temp });
  }
}

export default Weather;
