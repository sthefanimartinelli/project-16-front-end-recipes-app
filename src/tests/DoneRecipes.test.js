import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

afterEach(cleanup);
describe('', () => {
  // const BTN_SHARE = '0-horiontal-share-btn';
  test('test a', async () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });
    const btnAllFilter = screen.getByTestId('filter-by-all-btn');
    const btnMealFilter = screen.getByTestId('filter-by-meal-btn');
    const btnDrinkFilter = screen.getByTestId('filter-by-drink-btn');
    expect(btnAllFilter).toBeInTheDocument();
    expect(btnMealFilter).toBeInTheDocument();
    expect(btnDrinkFilter).toBeInTheDocument();
    userEvent.click(btnAllFilter);
    // userEvent.click(btnMealFilter);
    // userEvent.click(btnDrinkFilter);
    // const btnShare = screen.findByTestId(BTN_SHARE);
  });
  // expect(screen.getByText(/link copied!/i));
  // userEvent.click(btnShare);
  // const BtnFilteredMeal = screen.getByTestId('filter-by-meal-btn');
});
