import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
// import Meals from '../pages/Meals';

describe('Testes do componente Header', () => {
  test('Testa o caminho do Login até a página profile', async () => {
    const { debug } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const btnSubmit = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(btnSubmit);
    debug();

    // const { pathname } = history.location;

    // await waitFor(() => expect(pathname).toBe('/meals'));
    // debug();
    // await waitFor(() => screen.findByRole('heading', { name: /meals/i }), { timeout: 4000 });

    // expect(pathname).toBe('/meals');
    // await waitFor(() => {
    //   screen.getByRole('button', { name: /ícone de perfil/i });
    // }, { timeout: 5000 });

    // await waitFor(() => {
    //   screen.findByRole('button', { name: /ícone de pesquisa/i });
    // }, { timeout: 4000 });

    // const profileBtn = screen.getByRole('button', { name: /ícone de perfil/i });
    // const title = screen.getByRole('heading', {
    //   name: /título/i,
    // });
    // const searchBtn = screen.getByTestId('search-top-btn');

    // expect(profileBtn).toBeInTheDocument();
    // expect(searchBtn).toBeInTheDocument();

    // userEvent.click(profileBtn);

    // await waitFor(() => {
    //   screen.getByTestId('page-title');
    // }, { timeout: 4000 });

    // expect(screen.getByTestId('search-top-btn')).not.toBeInTheDocument();

    // act(() => {
    //   history.push('./drinks');
    // });

    // await waitFor(() => {
    //   screen.getByTestId('page-title');
    // }, { timeout: 4000 });
  });
});
