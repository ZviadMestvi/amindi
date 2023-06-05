import { useContext } from 'react';
import WeatherNav from '../weatherNav/WeatherNav';
import WeatherContext from '../../store/weatherContext';
import { WEATHER_CODES } from '../../constants';
import classes from './BasicInfo.module.css';

const BasicInfo = () => {
  const ctx = useContext(WeatherContext);
  const currentHour = new Date().getHours();
  const currentTemp = Math.round(
    ctx?.basicInfo.hourly?.temperature_2m[currentHour]
  );
  const weatherCode = WEATHER_CODES.find(code => {
    return code.id === ctx.basicInfo.hourly?.weathercode[currentHour];
  });

  return (
    <section className={classes.basicInfo}>
      <div className={classes.time}>
        <h1>{ctx.currentTime24}</h1>
        <p className={classes.temp}>
          <i
            className={`fa-solid ${weatherCode?.name || 'fa-xmark'}`}
            style={{ color: weatherCode?.color }}
          ></i>
          <span className={classes.tempValue}>{currentTemp || null}</span>
          <span className={classes.tempUnit}>{ctx.tempUnit}</span>
        </p>
      </div>

      <div className={classes.place}>
        <p>Tbilisi, Georgia</p>
      </div>

      <WeatherNav />
    </section>
  );
};

export default BasicInfo;
