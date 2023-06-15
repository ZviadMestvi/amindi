import { useContext } from 'react';
import BasicInfo from './components/basicInfo/BasicInfo';
import Weather from './components/weather/Weather';
import Error from './components/customError/Error';
import WeatherContext from './store/weatherContext';
import './App.css';

const App = () => {
  const ctx = useContext(WeatherContext);

  return (
    <div className="wrapper">
      {ctx?.error && <Error msg={ctx.error} />}
      <BasicInfo />
      <Weather />
    </div>
  );
};

export default App;

// Flag icons
// https://github.com/lipis/flag-icons
