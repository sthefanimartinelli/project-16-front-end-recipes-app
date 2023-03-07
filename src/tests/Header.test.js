import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
// import Meals from '../pages/Meals';

describe('Testes do componente Header', () => {
  test('Testa o caminho do Login até a página profile', async () => {
    const { debug, history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(btnSubmit);
    debug();

    const { pathname } = history.location;

    await waitFor(() => expect(pathname).toBe('/meals'), { timeout: 4000 });

    const profileBtn = screen.getByRole('button', { name: /ícone de perfil/i });

    const searchBtn = screen.getByTestId('search-top-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();

    userEvent.click(searchBtn);

    expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

    userEvent.click(profileBtn);
  });
});
