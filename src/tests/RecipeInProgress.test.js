import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';
import App from '../App';

const PATH_IN_PROGRESS = '/meals/52771/in-progress';
const FAVORITE_ID = 'favorite-btn';

describe('Testes da página receita em progresso', () => {
  test('Testa a renderização da página em progresso', async () => {
    renderWithRouter(<App />, { initialEntries: [PATH_IN_PROGRESS] });

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /spicy arrabiata penne/i }));
      expect(screen.getByTestId('finish-recipe-btn')).toBeDisabled();
    });
  });

  test('Testa o favoritos', async () => {
    renderWithRouter(<App />, { initialEntries: [PATH_IN_PROGRESS] });

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

    renderWithRouter(<App />, { initialEntries: [PATH_IN_PROGRESS] });

    await waitFor(() => {
      userEvent.click(screen.getByTestId('share-btn'));
    });
  });
});
