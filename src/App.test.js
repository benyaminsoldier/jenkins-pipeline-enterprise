import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Daniel Benjumea/i);
  expect(linkElement).toBeInTheDocument();
});