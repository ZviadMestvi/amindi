import classes from './LoadingSpinner.module.css';
import spinner from '../../assets/spinner.svg';

const LoadingSpinner = () => {
  return (
    <div className={classes.wrapper}>
      <img src={spinner} alt="Loading..." />
    </div>
  );
};

export default LoadingSpinner;
