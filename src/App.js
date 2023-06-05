import BasicInfo from './components/basicInfo/BasicInfo';
import Weather from './components/weather/Weather';
import './App.css';

const App = () => {
  return (
    <div className="wrapper">
      <BasicInfo />
      <Weather />
    </div>
  );
};

export default App;

// Flag icons
// https://github.com/lipis/flag-icons
