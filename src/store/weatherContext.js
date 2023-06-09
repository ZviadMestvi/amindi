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
  basicIsLoading: false,
});

export const WeatherContextProvider = props => {
  const [tempUnit, setTempUnit] = useState('°C');
  const [currentTime24, setCurrentTime24] = useState(getCurrentTime());
  const [weatherOption, setWeatherOption] = useState('daily');
  const [weatherData, setWeatherData] = useState({});
  const [basicInfo, setBasicInfo] = useState({});
  const [lastUpdate, setLastUpdate] = useState('01/01 22:22');
  const [isLoading, setIsLoading] = useState(false);
  const [basicIsLoading, setBasicIsLoading] = useState(false);
  const [rotateValue, setRotateValue] = useState(-720);

  const chooseWeatherOption = async function (option) {
    setIsLoading(true);
    try {
      setWeatherOption(option);
      const data = await fetchData(option);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const getCurrentWeather = async function () {
    setBasicIsLoading(true);
    try {
      const data = await fetchCurrentWeather();
      setBasicInfo(data);
    } catch (error) {
      console.error(error);
    }
    setBasicIsLoading(false);
  };

  const updateWeather = async function (el) {
    setRotateValue(rotateValue - 720);
    el.target.style.transform = `rotate(${rotateValue}deg)`;

    setIsLoading(true);
    try {
      getCurrentWeather();
      fetchData(weatherOption);
      const data = await fetchData(weatherOption);
      setWeatherData(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const initialFetch = async function () {
    setIsLoading(true);
    getCurrentWeather();
    const data = await fetchData(weatherOption);
    setWeatherData(data);
    setLastUpdate(getUpdateDate());
    setIsLoading(false);
  };

  useEffect(() => {
    initialFetch();

    // Update weather every hour
    // const weatherUpdateIntv = setInterval(() => {
    //   fetchData(weatherOption).then(data => setWeatherData(data));
    //   getCurrentWeather();
    // }, 3600000);

    // Update clock every second
    const interval = setInterval(() => {
      setCurrentTime24(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(interval);
      // clearInterval(weatherUpdateIntv);
    };
  }, []);

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
        basicIsLoading,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
