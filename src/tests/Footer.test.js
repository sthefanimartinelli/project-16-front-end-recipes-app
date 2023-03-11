import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Testes do componente Footer', () => {
  test('Testa se os elementos do Footer são renderizados na página Drinks e Meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const drinkBtn = await screen.findByTestId('drinks-bottom-btn');
    const mealBtn = await screen.findByTestId('meals-bottom-btn');

    expect(drinkBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
  });
  test('Testa se as rotas para as páginas /meals e /drinks por meio dos botões do footer funcionam', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const mealBtn = await screen.findByTestId('meals-bottom-btn');

    userEvent.click(mealBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals');
    });

    const drinkBtn = await screen.findByTestId('drinks-bottom-btn');

    userEvent.click(drinkBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks');
    });
  });
});
