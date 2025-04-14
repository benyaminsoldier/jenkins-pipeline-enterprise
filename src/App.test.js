import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const daniel = screen.getByText(/Daniel Benjumea/i);
  const Christine = screen.getByText(/Christine Ritchie/i);
  const Adam = screen.getByText(/Adam Workie/i);
  const Amy = screen.getByText(/Amy Cooper/i);
  expect(daniel).toBeInTheDocument();
  expect(Christine).toBeInTheDocument();
  expect(Adam).toBeInTheDocument();
  expect(Amy).toBeInTheDocument();
});