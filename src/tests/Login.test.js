import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Login from '../components/Login';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

describe('Testes da página Login', () => {
  test('Testa os inputs de email, senha e botão', () => {
    // renderWithRouter(<Login />);
    renderWithRouter(<App />);

    const emailElement = screen.getByTestId('email-input');
    const passwordElement = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    // expect(loginBtn).toBeDisabled();

    userEvent.type(emailElement, 'teste@teste.com.br');
    userEvent.type(passwordElement, '1234567');
    expect(loginBtn).toBeEnabled();
    userEvent.click(loginBtn);
    // expect(history.location.pathname).toBe('/meals');
    // expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(window.localStorage.setItem).toHaveBeenCalledWith('user', '');
  });
});
