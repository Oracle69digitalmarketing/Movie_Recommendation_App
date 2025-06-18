// src/__tests__/App.test.jsx
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders home route', () => {
  render(<App />);
  expect(screen.getByText(/Movie/i)).toBeInTheDocument();
});
