import { useContext } from 'react';
import WeatherCard from '../weatherCard/WeatherCard';
import WeatherContext from '../../store/weatherContext';
import { DAYS_SHORT, WEATHER_CODES } from '../../constants';
import { convertUnixTo24Hour } from '../../helpers';
import classes from './Weather.module.css';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const Weather = () => {
  const ctx = useContext(WeatherContext);

  const cards = ctx.weatherData.time?.map((hour, i) => {
    const hourDate = new Date(hour * 1000);
    const weatherCode = WEATHER_CODES.find(code => {
      return code.id === ctx.weatherData.weatherCode[i];
    });

    if (ctx.weatherData.tempType === 'hourly') {
      const currentHour = new Date();
      const convertedHour = convertUnixTo24Hour(hour);
      const data = {
        time: convertedHour,
        temp: Math.round(ctx.weatherData?.temp[i]),
        weatherCode: weatherCode,
      };

      // This makes sure to only show future 48 hours
      if (i > currentHour.getHours() + 48) return null;
      // Don't show older than current hour weather
      if (hourDate < currentHour) return null;

      return (
        <li key={i}>
          <WeatherCard data={data} />
        </li>
      );
    }

    const data = {
      time: DAYS_SHORT[i % 7],
      temp: `${Math.round(ctx.weatherData?.minTemp[i])}° - ${Math.round(
        ctx.weatherData?.maxTemp[i]
      )}`,
      weatherCode: weatherCode,
    };

    return (
      <li key={i}>
        <WeatherCard data={data} />
      </li>
    );
  });

  return (
    <section className={classes.weather}>
      <p className={classes.updated}>
        Last updated<span>{ctx.lastUpdate}</span>
        <span onClick={() => ctx.updateWeather()}>
          <i className="fa-solid fa-rotate-left fa-rotate-90"></i>
        </span>
      </p>
      <div className={classes.cardsWrapper}>
        {ctx.isLoading ? (
          <LoadingSpinner />
        ) : (
          <ul className={classes.cards}>{cards}</ul>
        )}
      </div>
    </section>
  );
};

export default Weather;
