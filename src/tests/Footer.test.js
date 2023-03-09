import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('Testes do componente Footer', () => {
  test('Testa se os elementos do Footer são renderizados na página Drinks e Meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const drinkBtn = screen.queryByTestId('drinks-bottom-btn');
    const mealBtn = screen.queryByTestId('meals-bottom-btn');

    expect(drinkBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
  });
  test('Testa se as rotas para as páginas /meals e /drinks por meio dos botões do footer funcionam', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const mealBtn = screen.queryByTestId('meals-bottom-btn');

    userEvent.click(mealBtn);

    expect(screen.queryByTestId('page-title').innerHTML).toBe('Meals');

    const newDrinkBtn = screen.queryByTestId('drinks-bottom-btn');
    userEvent.click(newDrinkBtn);

    expect(screen.queryByRole('heading', { name: /drinks/i })).toBeInTheDocument();
  });
});
