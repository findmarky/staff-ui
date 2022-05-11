 import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Fetch Next User button', () => {
  render(<App />);
  const element = screen.getByText('Fetch Next User');
  expect(element).toBeInTheDocument();
});

test('renders Navigation bar', () => {
  render(<App />);
  const element = screen.getByText('Application');
  expect(element).toBeInTheDocument();
});

test('renders User Table columns', () => {
  render(<App />);
  const imageTableColumnElement = screen.getByText('Image');
  expect(imageTableColumnElement).toBeInTheDocument();
  const nameTableColumnElement = screen.getByText('Name');
  expect(nameTableColumnElement).toBeInTheDocument();
  const emailTableColumnElement = screen.getByText('Email');
  expect(emailTableColumnElement).toBeInTheDocument();
});
