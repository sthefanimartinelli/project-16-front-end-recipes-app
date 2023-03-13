import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

describe('', () => {
  const BTN_SHARE = '0-horizontal-share-btn';
  beforeEach(() => {
    const localStore = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '23/06/2020',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '23/06/2020',
        tags: [],
      },
    ];
    localStorage.setItem('doneRecipes', JSON.stringify(localStore));
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });
  });
  afterEach(() => { localStorage.removeItem('doneRecipes'); });
  test('testa TUDDDDÃOOOOOOOOO!!!', () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    const btnAllFilter = screen.getByTestId('filter-by-all-btn');
    const btnMealFilter = screen.getByTestId('filter-by-meal-btn');
    const btnDrinkFilter = screen.getByTestId('filter-by-drink-btn');
    const btnShare = screen.getByTestId(BTN_SHARE);
    expect(btnAllFilter).toBeInTheDocument();
    expect(btnMealFilter).toBeInTheDocument();
    expect(btnDrinkFilter).toBeInTheDocument();
    expect(btnShare).toBeInTheDocument();
    userEvent.click(btnAllFilter);
    userEvent.click(btnMealFilter);
    userEvent.click(btnDrinkFilter);
    userEvent.click(btnShare);
    expect(screen.getByText(/link copied!/i));
  });
});
