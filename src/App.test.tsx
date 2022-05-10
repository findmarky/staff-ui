 import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Fetch Next User button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Fetch Next User/i);
  expect(linkElement).toBeInTheDocument();
});
