import React, { useEffect, useState } from 'react';
import { getCurrentTime, getUpdateDate } from '../helpers';
import { fetchCurrentWeather, fetchData } from '../api';

const WeatherContext = React.createContext({
  basicInfo: {
    temp: null,
    weatherCode: null,
  },
  currentTime24: getCurrentTime(),
  weatherOption: 'daily',
  tempUnit: '°C',
  weatherData: {},
  lastUpdate: '01/01 00:00',
  chooseWeatherOption: () => {},
  updateWeather: () => {},
  isLoading: false,
});

export const WeatherContextProvider = props => {
  const [tempUnit, setTempUnit] = useState('°C');
  const [currentTime24, setCurrentTime24] = useState(getCurrentTime());
  const [weatherOption, setWeatherOption] = useState('daily');
  const [weatherData, setWeatherData] = useState({});
  const [basicInfo, setBasicInfo] = useState({});
  const [lastUpdate, setLastUpdate] = useState('01/01 22:22');
  const [isLoading, setIsLoading] = useState(false);

  const chooseWeatherOption = function (option) {
    setWeatherOption(option);
    fetchData(option).then(data => setWeatherData(data));
  };

  const getCurrentWeather = function () {
    fetchCurrentWeather().then(data => setBasicInfo(data));
  };

  const updateWeather = function () {
    setIsLoading(true);
    fetchData(weatherOption).then(data => setWeatherData(data));
    setLastUpdate(getUpdateDate());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(weatherOption).then(data => setWeatherData(data));
    getCurrentWeather();
    setLastUpdate(getUpdateDate());

    // Update weather every hour
    const weatherUpdateIntv = setInterval(() => {
      fetchData(weatherOption).then(data => setWeatherData(data));
      getCurrentWeather();
    }, 60000);

    // Update clock every second
    const interval = setInterval(() => {
      setCurrentTime24(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(weatherUpdateIntv);
    };
  }, [weatherOption]);

  return (
    <WeatherContext.Provider
      value={{
        basicInfo,
        currentTime24,
        weatherOption,
        tempUnit,
        weatherData,
        chooseWeatherOption,
        lastUpdate,
        updateWeather,
        isLoading,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
