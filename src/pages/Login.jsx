import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const EMAIL_LENGTH = 6;

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const history = useHistory();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const isDisabled = (inputPassword.length > EMAIL_LENGTH && emailRegex.test(inputEmail));

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: inputEmail }));
    history.push('/meals');
  };

  return (
    <form>
      <input
        type="email"
        data-testid="email-input"
        value={ inputEmail }
        onChange={ ({ target }) => setInputEmail(target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        value={ inputPassword }
        onChange={ ({ target }) => setInputPassword(target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isDisabled }
        onClick={ handleSubmit }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
