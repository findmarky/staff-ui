 import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders increase counter button', () => {
  render(<App />);
  const linkElement = screen.getByText(/Increase Counter/i);
  expect(linkElement).toBeInTheDocument();
});
