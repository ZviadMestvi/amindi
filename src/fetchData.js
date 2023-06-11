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

const handleData = function (result, weatherOption) {
  if (weatherOption === 'hourly') {
    return {
      time: result.hourly.time,
      temp: result.hourly.temperature_2m,
      weatherCode: result.hourly.weathercode,
      all: result,
      tempType: 'hourly',
    };
  }

  return {
    time: result.daily.time,
    maxTemp: result.daily.temperature_2m_max,
    minTemp: result.daily.temperature_2m_min,
    weatherCode: result.daily.weathercode,
    all: result,
  };
};

export const fetchData = async function (weatherOption) {
  try {
    const response = await fetch(urls[weatherOption]);
    if (!response.ok) {
      return {
        status: 'error',
        errorMsg: `Something went wrong: status code (${response.status})`,
      };
    }

    const result = await response.json();
    return handleData(result, weatherOption);
  } catch (err) {
    const errObj = {
      status: 'error',
      errorMsg: 'Something went wrong',
    };

    if (err.message === 'Failed to fetch') {
      errObj.errorMsg = 'No internet connection';
    }

    return errObj;
  }
};

export const fetchCurrentWeather = async function () {
  try {
    const response = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=41.69&longitude=44.83&hourly=temperature_2m,weathercode&forecast_days=1&timezone=auto'
    );
    if (!response.ok) {
      return {
        status: 'error',
        errorMsg: `Something went wrong: status code (${response.status})`,
      };
    }

    return await response.json();
  } catch (err) {
    const errObj = {
      status: 'error',
      errorMsg: 'Something went wrong',
    };

    if (err.message === 'Failed to fetch') {
      errObj.errorMsg = 'No internet connection';
    }

    return errObj;
  }
};
