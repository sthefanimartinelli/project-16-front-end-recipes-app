import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
// import Meals from '../pages/Meals';
import renderWithRouter from './helpers/renderWith';

describe('Testes do componente "Footer"', () => {
  it('verifica se o botão "meals" está clicável na tela.', () => {
    renderWithRouter(<Drinks />);
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();

    userEvent.click(mealsBtn);

    // expect(history.pathname).toBe('./meals');
  });
});
