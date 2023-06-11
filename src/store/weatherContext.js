import React, { useEffect, useState } from 'react';
import { getCurrentTime, getUpdateDate } from '../helpers';
import { fetchCurrentWeather, fetchData } from '../fetchData';

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
  fetchError: false,
  basicFetchError: false,
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
  const [fetchError, setFetchError] = useState(false);
  const [basicFetchError, setBasicFetchError] = useState(false);

  const chooseWeatherOption = async function (option) {
    setFetchError(false);
    setIsLoading(true);
    setWeatherOption(option);
    const data = await fetchData(option);
    if (data.status === 'error') setFetchError(data.errorMsg);
    setWeatherData(data);
    setIsLoading(false);
  };

  const getCurrentWeather = async function () {
    setBasicIsLoading(true);
    const data = await fetchCurrentWeather();
    if (data.status === 'error') setBasicFetchError(data.errorMsg);
    setBasicInfo(data);
    setBasicIsLoading(false);
  };

  const updateWeather = async function (el) {
    setRotateValue(rotateValue - 720);
    el.target.style.transform = `rotate(${rotateValue}deg)`;

    setIsLoading(true);
    getCurrentWeather();
    fetchData(weatherOption);
    const data = await fetchData(weatherOption);
    setWeatherData(data);
    setIsLoading(false);
  };

  const initialFetch = async function () {
    setIsLoading(true);
    getCurrentWeather();
    const data = await fetchData(weatherOption);
    if (data.status === 'error') setFetchError(data.errorMsg);
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
        fetchError,
        basicFetchError,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
