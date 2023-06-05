import { useContext, useState } from 'react';
import { WEATHER_OPTIONS } from '../../constants';
import classes from './WeatherNav.module.css';
import WeatherContext from '../../store/weatherContext';

const WeatherNav = () => {
  const ctx = useContext(WeatherContext);
  const [activeBtn, setActiveBtn] = useState(1);
  const [detail, setDetail] = useState('7 Days');

  const options = WEATHER_OPTIONS.map(option => {
    return (
      <li
        key={option.id}
        className={option.id === activeBtn ? classes.active : ''}
        onClick={() => {
          ctx.chooseWeatherOption(option.name);
          setActiveBtn(option.id);
          setDetail(option.detail);
        }}
      >
        <button>{option.name}</button>
      </li>
    );
  });

  return (
    <>
      <ul className={classes.weatherNav}>{options}</ul>
      <div className={classes.detail}>
        <p>
          Showing: <span>{detail}</span>
        </p>
      </div>
    </>
  );
};

export default WeatherNav;
