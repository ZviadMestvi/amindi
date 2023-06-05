import { useContext } from 'react';
import WeatherContext from '../../store/weatherContext';
import classes from './WeatherCard.module.css';

const WeatherCard = props => {
  const ctx = useContext(WeatherContext);
  const weatherCode = props.data.weatherCode;

  return (
    <div className={classes.weatherCard}>
      <p className={classes.temp}>
        {props.data?.temp}
        <span className={classes.tempUnit}>{ctx.tempUnit}</span>
      </p>
      <i
        className={`fa-solid ${weatherCode ? weatherCode.name : 'fa-xmark'}`}
        style={{ color: weatherCode?.color }}
      ></i>
      <p className={classes.day}>{props.data?.time}</p>
    </div>
  );
};

export default WeatherCard;
