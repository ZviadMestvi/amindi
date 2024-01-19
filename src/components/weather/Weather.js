import { useContext } from 'react';
import WeatherCard from '../weatherCard/WeatherCard';
import WeatherContext from '../../store/weatherContext';
import { DAYS_SHORT, MONTHS_SHORT, WEATHER_CODES } from '../../constants';
import { convertUnixTo24Hour } from '../../helpers';
import reload from '../../assets/reload.svg';
import classes from './Weather.module.css';

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

      // This makes sure to show maximum of 48 hours in future
      if (i > currentHour.getHours() + 48) return null;
      // Don't show older than current hour weather
      if (hourDate < currentHour) return null;

      return <WeatherCard key={i} data={data} />;
    }

    const data = {
      time: `${DAYS_SHORT[hourDate.getDay()]} (${hourDate.getDate()} ${MONTHS_SHORT[hourDate.getMonth()]})`,
      temp: `${Math.round(ctx.weatherData?.minTemp[i])}° - ${Math.round(ctx.weatherData?.maxTemp[i])}`,
      weatherCode: weatherCode,
    };

    return <WeatherCard key={i} data={data} />;
  });

  return (
    <section className={classes.weather}>
      <p className={classes.updateTime}>
        Last updated<span>{ctx.lastUpdate}</span>
        <span onClick={e => ctx.updateWeather(e)}>
          <img src={reload} alt="Update weather" />
        </span>
      </p>
      <div className={classes.cardsWrapper}>{ctx.weatherData.status === 'default' ? <p>{ctx.error}</p> : <ul className={classes.cards}>{cards}</ul>}</div>
    </section>
  );
};

export default Weather;
