 import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Navigation bar', () => {
  render(<App />);
  expect(screen.getByText('Application')).toBeInTheDocument();
  expect(screen.getByText('Users')).toBeInTheDocument();
  expect(screen.getByText('Roles')).toBeInTheDocument();
});