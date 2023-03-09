import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';

describe('Testes da página Login', () => {
  test('Testa os inputs de email, senha e botão', () => {
    renderWithRouter(<App />);

    const emailElement = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordElement = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginBtn = screen.getByTestId(LOGIN_BTN_TEST_ID);

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
  });

  test('Testa se o botão fica desabilitado quando os inputs não estão preenchidos corretamente, e se habilita ao preencher corretamente', () => {
    renderWithRouter(<App />);

    const emailElement = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordElement = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginBtn = screen.getByTestId(LOGIN_BTN_TEST_ID);

    userEvent.type(emailElement, 'teste@teste.com.br');
    userEvent.type(passwordElement, '123456');
    expect(loginBtn).toBeDisabled();

    userEvent.clear(passwordElement);
    userEvent.type(passwordElement, '1234567');
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);
    // expect(history.location.pathname).toBe('/meals');
    // expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(window.localStorage.setItem).toHaveBeenCalledWith('user', '');
  });
});
