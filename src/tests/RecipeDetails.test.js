// import React from 'react';
// import { screen, waitFor } from '@testing-library/react';
// // import userEvent from '@testing-library/user-event';
// import { renderWithRouter } from './helpers/renderWith';
// import App from '../App';
// // import oneDrink from '../../cypress/mocks/oneDrink';
// import oneMeal from '../../cypress/mocks/oneMeal';

// describe('Testes do componente RecipeDetails', () => {
//   test('Testa se os elementos são renderizados ao carregar a página', async () => {
//     jest.spyOn(global, 'fetch');
//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(oneMeal),
//     });

//     renderWithRouter(<App />, { initialEntries: ['/meals/52771'] });

//     await waitFor(() => {
//       expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
//     });

//     //   await waitFor(() => {
//     //     const allFilter = screen.getByTestId(ALL_FILTER_ID);
//     //     expect(allFilter).toBeInTheDocument();
//     //   });

//     //   expect(await screen.findByTestId('Beef-category-filter')).toBeInTheDocument();
//     //   expect(await screen.findByTestId(BREAKFAST_FILTER_ID)).toBeInTheDocument();
//     //   expect(await screen.findByTestId('Chicken-category-filter')).toBeInTheDocument();
//     //   expect(await screen.findByTestId('Dessert-category-filter')).toBeInTheDocument();
//     //   expect(await screen.findByTestId('Goat-category-filter')).toBeInTheDocument();
//     //   expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
//     //   expect(global.fetch).toHaveBeenCalledTimes(2);

//   //   const breakfastFilter = screen.getByTestId(BREAKFAST_FILTER_ID);
//   //   userEvent.click(breakfastFilter);
//   //   userEvent.click(breakfastFilter);
//   });

//   // test('Testa se ao entrar na página Drinks os 5 primeiros filtros são renderizados', async () => {
//   //   jest.spyOn(global, 'fetch');
//   //   global.fetch.mockResolvedValue({
//   //     json: jest.fn().mockResolvedValue(drinkCategories),
//   //   });

//   //   renderWithRouter(<App />, { initialEntries: ['/drinks'] });

//   //   expect(screen.getByTestId('page-title')).toBeInTheDocument();

//   //   await waitFor(() => {
//   //     const allFilter = screen.getByTestId(ALL_FILTER_ID);
//   //     expect(allFilter).toBeInTheDocument();
//   //   });

//   //   expect(await screen.findByTestId('Ordinary Drink-category-filter')).toBeInTheDocument();
//   //   expect(await screen.findByTestId('Cocktail-category-filter')).toBeInTheDocument();
//   //   expect(await screen.findByTestId('Shake-category-filter')).toBeInTheDocument();
//   //   expect(await screen.findByTestId('Other/Unknown-category-filter')).toBeInTheDocument();
//   //   expect(await screen.findByTestId(COCOA_FILTER_ID)).toBeInTheDocument();
//   //   expect(await screen.findByTestId('0-card-name')).toBeInTheDocument();
//   //   expect(global.fetch).toHaveBeenCalledTimes(2);

//   //   const cocoaFilter = screen.getByTestId(COCOA_FILTER_ID);
//   //   userEvent.click(cocoaFilter);
//   //   userEvent.click(cocoaFilter);
//   // });

//   // test('Testa se ao clicar no botão de filtro All, todos os drinks são renderizados', async () => {
//   //   jest.spyOn(global, 'fetch');
//   //   global.fetch.mockResolvedValue({
//   //     json: jest.fn().mockResolvedValue(drinkCategories),
//   //   });

//   //   renderWithRouter(<App />, { initialEntries: ['/drinks'] });

//   //   await waitFor(() => {
//   //     const allFilter = screen.getByTestId(ALL_FILTER_ID);
//   //     userEvent.click(allFilter);
//   //   });
//   // });
// });
