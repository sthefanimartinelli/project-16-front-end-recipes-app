import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
// import Meals from '../pages/Meals';

const SEARCH_INPUT_TEST_ID = 'search-input';

describe('Testes do componente Header', () => {
  test('Testa se os elementos são renderizados na página Meals', async () => {
    const { debug } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const pageTitle = screen.queryByRole('heading', { name: /meals/i });
    const profileBtn = screen.queryByTestId('profile-top-btn');
    const searchBtn = screen.queryByTestId('search-top-btn');
    const searchBarInput = screen.queryByTestId(SEARCH_INPUT_TEST_ID);

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(searchBarInput).not.toBeInTheDocument();

    userEvent.click(searchBtn);

    expect(screen.getByTestId(SEARCH_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();

    userEvent.click(searchBtn);

    expect(screen.queryByTestId(SEARCH_INPUT_TEST_ID)).not.toBeInTheDocument();

    userEvent.click(profileBtn);

    debug();
  });
});
