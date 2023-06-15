import classes from './Error.module.css';

const Error = props => {
  return (
    <div className={classes.wrapper}>
      <p>{props.msg}</p>
    </div>
  );
};

export default Error;
