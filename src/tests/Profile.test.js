import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const LOGIN_BTN_TEST_ID = 'login-submit-btn';

describe('Testes da página Profile', () => {
  test('Testa os elementos que devem ser renderizados na página', async () => {
    const { history } = renderWithRouter(<App />);

    const emailElement = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const passwordElement = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const loginBtn = screen.getByTestId(LOGIN_BTN_TEST_ID);

    userEvent.type(emailElement, 'teste@teste.com.br');
    userEvent.type(passwordElement, '1234567');

    await waitFor(() => {
      expect(loginBtn).toBeEnabled();
    });

    userEvent.click(loginBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    });

    const profileBtn = await screen.findByRole('button', { name: /ícone de perfil/i });

    userEvent.click(profileBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/profile');
    });
  });

  test('Testa o caminho até done-recipes', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    userEvent.click(await screen.findByRole('button', { name: /done recipes/i }));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/done-recipes');
    });
  });

  test('Testa o caminho até favorite-recipes', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    userEvent.click(await screen.findByRole('button', { name: /favorite recipes/i }));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/favorite-recipes');
    });
  });

  test('Testa o caminho até logout', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    userEvent.click(await screen.findByRole('button', { name: /logout/i }));

    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
  // userEvent.click(await screen.findByRole('button', { name: /ícone de perfil/i }));
  // await waitFor(() => {
  //   expect(history.location.pathname).toBe('/profile');
  // });

  // userEvent.click(screen.findByRole('button', { name: /favorite recipes/i }));

  // await waitFor(() => {
  //   expect(history.location.pathname).toBe('/favorite-recipes');
  // });
});
