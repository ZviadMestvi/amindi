import classes from './Error.module.css';

const Error = props => {
  return (
    <div>
      <p>{props.message}</p>
    </div>
  );
};

export default Error;
