const urls = {
  hourly:
    'https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&hourly=temperature_2m,weathercode&timeformat=unixtime&forecast_days=3&timezone=auto',
  daily:
    'https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&daily=weathercode,temperature_2m_max,temperature_2m_min&timeformat=unixtime&timezone=auto',
  weekly:
    'https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&daily=weathercode,temperature_2m_max,temperature_2m_min&timeformat=unixtime&forecast_days=14&timezone=auto',
  monthly:
    'https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&daily=weathercode,temperature_2m_max,temperature_2m_min&timeformat=unixtime&forecast_days=16&timezone=auto',
};

export const fetchData = async function (weatherOption) {
  const response = await fetch(urls[weatherOption]);
  const result = await response.json();

  if (weatherOption === 'hourly') {
    const data = {
      time: result.hourly.time,
      temp: result.hourly.temperature_2m,
      weatherCode: result.hourly.weathercode,
      all: result,
      tempType: 'hourly',
    };

    return data;
  }

  const data = {
    time: result.daily.time,
    maxTemp: result.daily.temperature_2m_max,
    minTemp: result.daily.temperature_2m_min,
    weatherCode: result.daily.weathercode,
    all: result,
  };

  return data;
};

export const fetchCurrentWeather = async function () {
  const response = await fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&hourly=temperature_2m,weathercode&forecast_days=1&timezone=auto'
  );

  const result = await response.json();

  return result;
};
