import React, { Component } from 'react';

import request from 'utils/request';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const getWeatherMetaPath = ({ lat, lng }) =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${API_KEY}`;

class Weather extends Component {
  state = {
    weather: null,
    endpoint: '',
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
        const endpoint = getWeatherMetaPath({ lat, lng });
        // console.log(endpoint)
        this.setState({ endpoint }, this.getWeather);
      });
    }
  }

  getWeather = () => {
    const { endpoint } = this.state;
    request(endpoint, { method: 'GET' }).then(weather => console.log(weather));
  };

  render() {
    return <div>{' '}</div>;
  }
}

export default Weather;
