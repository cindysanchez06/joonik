import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { getLocations } from './services/api';

// Mock del módulo api
jest.mock('./services/api', () => ({
  getLocations: jest.fn()
}));

test('renders Sedes Colombia heading', async () => {
  (getLocations as any).mockResolvedValue([]);
  
  render(<App />);
  
  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /sedes colombia/i })).toBeInTheDocument();
  });
});
