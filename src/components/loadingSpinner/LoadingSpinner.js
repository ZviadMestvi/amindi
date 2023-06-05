import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return (
    <div className={classes.wrapper}>
      <i class="fa-solid fa-spinner"></i>
    </div>
  );
};

export default LoadingSpinner;
