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
  error: false,
});

export const WeatherContextProvider = props => {
  const [tempUnit, setTempUnit] = useState('°C');
  const [currentTime24, setCurrentTime24] = useState(getCurrentTime());
  const [weatherOption, setWeatherOption] = useState(
    JSON.parse(localStorage.getItem('weatherOption')) || {
      id: 1,
      name: 'daily',
      detail: '7 days',
    }
  );
  const [weatherData, setWeatherData] = useState(
    JSON.parse(localStorage.getItem(`${weatherOption.name}Data`)) || {
      status: 'default',
    }
  );
  const [basicInfo, setBasicInfo] = useState(
    JSON.parse(localStorage.getItem('basicInfo')) || {}
  );
  const [lastUpdate, setLastUpdate] = useState(
    localStorage.getItem('lastUpdateDate') || '01/01 22:22'
  );
  const [rotateValue, setRotateValue] = useState(-720);
  const [error, setError] = useState(false);

  const getCurrentWeather = async function () {
    const data = await fetchCurrentWeather();
    if (data.status === 'error') {
      setError(data.errorMsg);
      return;
    }

    setBasicInfo(data);
    localStorage.setItem('basicInfo', JSON.stringify(data));
  };

  const initialFetch = async function () {
    // Handle basic info
    getCurrentWeather();

    // Fetch data
    const data = await fetchData(weatherOption.name);
    if (data.status === 'error') {
      const localData = JSON.parse(
        localStorage.getItem(`${weatherOption.name}Data`)
      );

      setError(data.errorMsg);

      // This checks when there is an error if local data exists it will display that
      // if not it will display default data
      localData && setWeatherData(localData);
      return;
    }

    // Set data in local storage and display it
    setWeatherData(data);
    localStorage.setItem(`${weatherOption.name}Data`, JSON.stringify(data));

    // Set last update time
    const updateDate = getUpdateDate();
    setLastUpdate(updateDate);
    localStorage.setItem('lastUpdateDate', updateDate);
  };

  const chooseWeatherOption = async function (option) {
    // Set weather option
    setWeatherOption(option);
    localStorage.setItem('weatherOption', JSON.stringify(option));

    // Fetch data
    const data = await fetchData(option.name);
    if (data.status === 'error') {
      const localData = JSON.parse(
        localStorage.getItem(`${weatherOption.name}Data`)
      );

      setError(data.errorMsg);
      localData && setWeatherData(localData);
      return;
    }

    // Set and display data
    setWeatherData(data);
    localStorage.setItem(`${weatherOption.name}Data`, JSON.stringify(data));
  };

  const updateWeather = async function (el) {
    setRotateValue(rotateValue - 360);
    el.target.style.transform = `rotate(${rotateValue}deg)`;

    getCurrentWeather();
    const data = await fetchData(weatherOption.name);
    if (data.status === 'error') {
      const localData = JSON.parse(
        localStorage.getItem(`${weatherOption.name}Data`)
      );

      setError(data.errorMsg);
      localData && setWeatherData(localData);
      return;
    }

    setWeatherData(data);
    localStorage.setItem(`${weatherOption.name}Data`, JSON.stringify(data));

    const updateDate = getUpdateDate();
    setLastUpdate(updateDate);
    localStorage.setItem('lastUpdateDate', updateDate);
  };

  useEffect(() => {
    initialFetch();

    // Update clock every second
    const interval = setInterval(() => {
      setCurrentTime24(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(interval);
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
        error,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherContext;
