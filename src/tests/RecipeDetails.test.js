import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const PATH_TO_DETAIL = '/meals/52977';
const FAVORITE_ID = 'favorite-btn';
const DETAILS_ID = '/meals/52771';

describe('Testes da página Recipe Details', () => {
  test('Testa a renderização da página de detalhes a partir de Meals', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      userEvent.click(screen.getByRole('img', { name: /corba/i }));
    }, { timeout: 10000 });

    await waitFor(() => {
      expect(history.location.pathname).toBe(PATH_TO_DETAIL);
      expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
    });
  });

  test('Testa o favoritos', async () => {
    renderWithRouter(<App />, { initialEntries: [PATH_TO_DETAIL] });

    await waitFor(() => {
      userEvent.click(screen.getByTestId(FAVORITE_ID));
    });
  });

  test('Testa o compartilhar', async () => {
    // Código compartilhado no slack para resolver problema da lib clipboard-copy

    Object.assign(navigator, {
      clipboard: {
        writeText: () => 'Link copied!',
      },
    });

    renderWithRouter(<App />, { initialEntries: [PATH_TO_DETAIL] });

    await waitFor(() => {
      userEvent.click(screen.getByTestId('share-btn'));
    });
  });

  test('Testa começar a receita', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [PATH_TO_DETAIL] });

    await waitFor(() => {
      userEvent.click(screen.getByRole('button', { name: /start recipe/i }));
    });

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52977/in-progress');
      const finishBtn = screen.getByRole('button', { name: /finalizar/i });
      expect(finishBtn.disabled).toBe(true);
    });

    const checkBox1 = screen.getByTestId('0-ingredient-step');
    console.log(checkBox1);
  });

  localStorage.clear();

  test('Testa receita finalizada', async () => {
    const doneRecipe = [{
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '22/6/2020',
      tags: ['Pasta', 'Curry'],
    }];

    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipe));

    renderWithRouter(<App />, { initialEntries: [DETAILS_ID] });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
    });

    expect(screen.queryByRole('button', { name: /start recipe/i })).not.toBeInTheDocument();
  });

  test('Testa receita favoritada', async () => {
    const favoriteRecipes = [
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

    renderWithRouter(<App />, { initialEntries: [DETAILS_ID] });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /spicy arrabiata penne/i })).toBeInTheDocument();
    });

    expect(await screen.findByTestId(FAVORITE_ID)).toBeInTheDocument();
    localStorage.clear();
    // expect(screen.getByTestId('favorite-btn').src).toContain('blackHeartIcon.svg');
  });
});
