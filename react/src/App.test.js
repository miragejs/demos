import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';

it('renders', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('users')).toBeInTheDocument();
});

it('will show a list of users', async () => {
  global.server.createList('user', 5);

  const { getByTestId, debug } = render(<App />);
  await waitForElement(() => getByTestId('user-1'));

  // assert for 5 users
  expect(getByTestId('users')).toBeInTheDocument();
});

it.todo('will show the name of a user');

it.todo('show a message if there are no users');
