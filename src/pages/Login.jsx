import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Login.module.css';
import tomato from '../images/tomate.svg';
import heart from '../images/Vector.svg';
import elipse from '../images/Ellipse 1.svg';
import pan from '../images/Vector (1).svg';
import rectangle from '../images/Rectangle 2.svg';
import recipe from '../images/Recipes.svg';

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
    <div className={ styles.container__main }>
      <img className={ styles.tomato__img } src={ tomato } alt="tamate" />
      <header className={ styles.container__header }>
        <div className={ styles.container__logo }>
          <img className={ styles.img_heart } src={ heart } alt="" />
          <img className={ styles.rectangle } src={ rectangle } alt="" />
          <img className={ styles.rectangle } src={ recipe } alt="" />
          <div className={ styles.container__logo__inner }>
            <img className={ styles.elipse } src={ elipse } alt="" />
            <img src="" alt="" />
            <img className={ styles.pan } src={ pan } alt="" />
          </div>
        </div>
      </header>
      <div className={ styles.container__form }>
        <p style={ styles.p }>Login</p>
        <form>
          <input
            placeholder="Email"
            type="email"
            name="email"
            data-testid="email-input"
            value={ inputEmail }
            onChange={ ({ target }) => setInputEmail(target.value) }
          />
          <input
            placeholder="Password"
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
            className={ isDisabled ? '' : styles.disabledBtn }
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
