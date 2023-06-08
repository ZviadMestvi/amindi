import { useContext, useRef, useState } from 'react';
import WeatherContext from '../../store/weatherContext';
import classes from './WeatherCard.module.css';

const WeatherCard = props => {
  const weatherName = useRef();
  const ctx = useContext(WeatherContext);
  const weatherCode = props.data.weatherCode;

  const handleMouseOver = function () {
    weatherName.current.style.display = 'block';
  };

  const handleMouseMove = function (e) {
    const tipboxRect = weatherName.current.getBoundingClientRect();
    const offsetY = 5;
    const offsetX = 10;

    weatherName.current.style.top = `${
      e.clientY - tipboxRect.height - offsetY
    }px`;
    weatherName.current.style.left = `${e.clientX + offsetX}px`;
  };

  const handleMouseOut = function () {
    weatherName.current.style.display = 'none';
  };

  return (
    <>
      <div className={classes.weatherCard}>
        <p className={classes.temp}>
          {props.data?.temp}
          <span className={classes.tempUnit}>{ctx.tempUnit}</span>
        </p>
        {weatherCode && (
          <img
            onMouseMove={handleMouseMove}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            src={weatherCode?.src}
            alt={weatherCode?.alt}
          />
        )}

        <p className={classes.day}>{props.data?.time}</p>
      </div>

      <div ref={weatherName} className={classes.weatherName}>
        <p>{weatherCode?.alt}</p>
      </div>
    </>
  );
};

export default WeatherCard;
