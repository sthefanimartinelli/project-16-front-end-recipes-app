import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const EMAIL_LENGTH = 6;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (inputPassword.length > EMAIL_LENGTH && emailRegex.test(inputEmail)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [inputEmail, inputPassword]);

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: inputEmail }));
    history.push('/meals');
  };

  return (
    <form>
      <input
        type="email"
        name="email"
        data-testid="email-input"
        value={ inputEmail }
        onChange={ ({ target }) => setInputEmail(target.value) }
      />
      <input
        type="password"
        name="password"
        data-testid="password-input"
        value={ inputPassword }
        onChange={ ({ target }) => setInputPassword(target.value) }
      />
      <button
        type="button"
        name="login-btn"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
        onClick={ handleSubmit }
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
