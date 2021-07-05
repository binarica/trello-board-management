import PropTypes, { InferProps } from 'prop-types';
import { toast } from 'react-toastify';

const loginPropTypes = {
  setToken: PropTypes.func.isRequired
};

type LoginProps = InferProps<typeof loginPropTypes>;

const Login = ({ setToken }: LoginProps) => {
  const authenticationSuccess = () => {
    toast.success('You are now logged in!');
    setToken(Trello.token());
  };

  const authenticationFailure = () => {
    toast.error('Failed authentication');
  };

  const handleClick = () => {
    Trello.authorize({
      type: 'popup',
      name: 'Trello Board Management',
      persist: true,
      scope: {
        read: 'true',
        write: 'true'
      },
      expiration: 'never',
      success: authenticationSuccess,
      error: authenticationFailure
    });
  };

  return (
    <>
      <h3>Welcome! Click below to login.</h3>
      <button className="login-button" onClick={handleClick}>
        🔑 Log in with your Trello account
      </button>
    </>
  );
};

export default Login;
