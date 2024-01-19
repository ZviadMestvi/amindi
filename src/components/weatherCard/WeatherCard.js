import { useContext, useRef } from 'react';
import WeatherContext from '../../store/weatherContext';
import classes from './WeatherCard.module.css';

const WeatherCard = props => {
  const tipboxRef = useRef();
  const cardWrapperRef = useRef();
  const ctx = useContext(WeatherContext);
  const weatherCode = props.data.weatherCode;

  const handleMouseOver = function () {
    tipboxRef.current.style.display = 'block';
  };

  const handleMouseMove = function (e) {
    const tipboxRect = tipboxRef.current.getBoundingClientRect();
    const cardWrapperRect = cardWrapperRef.current.getBoundingClientRect();
    const offsetY = 5;
    const offsetX = 10;

    tipboxRef.current.style.top = `${e.clientY - cardWrapperRect.top - tipboxRect.height - offsetY}px`;
    tipboxRef.current.style.left = `${e.clientX - cardWrapperRect.left + offsetX}px`;
  };

  const handleMouseOut = function () {
    tipboxRef.current.style.display = 'none';
  };

  return (
    <li ref={cardWrapperRef} className={classes.weatherCardWrapper}>
      <div className={classes.weatherCard}>
        <p className={classes.temp}>
          {props.data?.temp}
          <span className={classes.tempUnit}>{ctx.tempUnit}</span>
        </p>
        {weatherCode && <img onMouseMove={handleMouseMove} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} src={weatherCode?.src} alt={weatherCode?.alt} />}

        <p className={classes.day}>{props.data?.time}</p>
      </div>

      <div ref={tipboxRef} className={classes.weatherName}>
        <p>{weatherCode?.alt}</p>
      </div>
    </li>
  );
};

export default WeatherCard;
