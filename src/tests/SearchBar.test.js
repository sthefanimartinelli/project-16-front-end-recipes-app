import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

describe('testando SearchBar', () => {
  const SEARCH_TOP_BTN = 'search-top-btn';
  const SEARCH_INPUT = 'search-input';
  const EXECT_SEARCH_BTN = 'exec-search-btn';
  const NAME_SEARCH_RADIO = 'name-search-radio';
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('verifica se os elementos da requisição de refeiçoes estão em tela', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const btnSearch = await screen.findByTestId(SEARCH_TOP_BTN);
    expect(btnSearch).toBeInTheDocument();
    userEvent.click(btnSearch);

    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const inputIngredients = screen.getByTestId('ingredient-search-radio');
    const buttonFetch = await screen.findByTestId(EXECT_SEARCH_BTN);

    userEvent.type(inputSearch, 'onions');
    userEvent.click(inputIngredients);
    userEvent.click(buttonFetch);

    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=onions');

    // await waitFor(() => {
    //   // expect(screen.getByText(/beef dumpling stew/i));
    //   // expect(screen.getByTestId('0-recipe-card'));
    //   // expect(screen.getByRole('img', { name: /beef dumpling stew/i }));
    // }, { timeout: 4000 });
  }, 50000);
  test('testa  se é redirecionada para tela de detalhes(/meals)', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const btnSearch = await screen.findByTestId('search-top-btn');
    userEvent.click(btnSearch);
    const inputName = await screen.findByTestId(NAME_SEARCH_RADIO);
    const buttonFetch = await screen.findByTestId(EXECT_SEARCH_BTN);
    const inputSearch = await screen.findByTestId('search-input');

    userEvent.type(inputSearch, 'Arrabiata');
    await waitFor(() => {
      userEvent.click(inputName);
      userEvent.click(buttonFetch);
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52771');
    });
  });
  test('Verifica algumas bebidas estão na tela', async () => {
    const { debug } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const btnSearch = await screen.findByTestId(SEARCH_TOP_BTN);
    userEvent.click(btnSearch);
    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    const inputName = await screen.findByTestId('ingredient-search-radio');
    const buttonFetch = await screen.findByTestId(EXECT_SEARCH_BTN);
    userEvent.type(inputSearch, 'Light rum');
    userEvent.click(inputName);
    userEvent.click(buttonFetch);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
    debug();
    await waitFor(() => {
      expect(screen.getByText('151 Florida Bushwacker'));
      expect(screen.getByTestId('0-recipe-card'));
      expect(screen.ByTestId('0-card-img'));
    });
  });
  test('testa  se é redirecionada para tela de detalhes(/drinks)', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const btnSearch = await screen.findByTestId(SEARCH_TOP_BTN);
    userEvent.click(btnSearch);
    const inputName = await screen.findByTestId(NAME_SEARCH_RADIO);
    const buttonFetch = await screen.findByTestId(EXECT_SEARCH_BTN);
    const inputSearch = await screen.findByTestId(SEARCH_INPUT);
    userEvent.type(inputSearch, 'Aquamarine');
    userEvent.click(inputName);
    userEvent.click(buttonFetch);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
  test('Deve exibir um alerta ao clicar em tal botão', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    global.alert = jest.fn();
    const btnSearch = await screen.findByTestId(SEARCH_TOP_BTN);
    userEvent.click(btnSearch);
    const buttonFetch = await screen.findByTestId(EXECT_SEARCH_BTN);
    userEvent.click(buttonFetch);
    await waitFor(() => {
      expect(global.alert).toBeCalled();
    });
  });
});
