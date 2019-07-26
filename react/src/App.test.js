import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from './App';

it('renders', () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('loading')).toBeInTheDocument();
});

it('will show the name of a user', async () => {
  global.server.create('user', { name: 'Alice' });

  const { getByTestId } = render(<App />);

  await waitForElement(() => getByTestId('users'))

  expect(getByTestId('user-1')).toHaveTextContent('Alice');
});

it('will show a list of users', async () => {
  global.server.createList('user', 5);

  const { getByTestId } = render(<App />);

  await waitForElement(() => getByTestId('users'))

  expect(getByTestId('users')).toContainElement(getByTestId('user-1'));
  expect(getByTestId('users')).toContainElement(getByTestId('user-2'));
  expect(getByTestId('users')).toContainElement(getByTestId('user-3'));
  expect(getByTestId('users')).toContainElement(getByTestId('user-4'));
  expect(getByTestId('users')).toContainElement(getByTestId('user-5'));
});

it('show a message if there are no users', async () => {
  global.server.db.loadData({ users: [] });

  const { getByTestId } = render(<App />);

  await waitForElement(() => getByTestId('no-users'))

  expect(getByTestId('no-users')).toBeInTheDocument();
});

test('it will show a message while the users are loading', async () => {
  let respond;

  // here we're going to tell our server to return a promise that
  // doesnt resolve. this will make the http request sit in a
  // a pending state, which means our react component will be
  // prementely showing its loading message.
  global.server.get("/users", () => {
    return new Promise(resolve => {
      respond = resolve;
    });
  });

  let { getByTestId } = render(<App />)

  expect(getByTestId("loading")).toBeInTheDocument();

  // finally, let's respond so we don't leave it hanging forever :)
  respond();
});
