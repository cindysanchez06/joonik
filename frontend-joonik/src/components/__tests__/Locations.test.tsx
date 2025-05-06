import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Locations from '../Locations';
import { getLocations } from '../../services/api';

// Mock del módulo api
jest.mock('../../services/api', () => ({
  getLocations: jest.fn()
}));

describe('Locations Component', () => {
  const mockLocations = [
    {
      id: 1,
      name: 'Sede Principal',
      url: 'https://example.com/sede1.jpg',
      createdAt: '2024-03-20T10:00:00Z'
    },
    {
      id: 2,
      name: 'Sede Norte',
      url: 'https://example.com/sede2.jpg',
      createdAt: '2024-03-20T11:00:00Z'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('muestra el título "Sedes Colombia"', async () => {
    (getLocations as any).mockResolvedValue(mockLocations);
    
    render(<Locations />);
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Sedes Colombia' })).toBeInTheDocument();
    });
  });

  it('muestra el loading spinner mientras carga', () => {
    (getLocations as any).mockImplementation(() => new Promise(() => {}));
    
    render(<Locations />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('muestra las ubicaciones cuando se cargan correctamente', async () => {
    (getLocations as any).mockResolvedValue(mockLocations);
    
    render(<Locations />);
    
    await waitFor(() => {
      expect(screen.getByText('Sede Principal')).toBeInTheDocument();
      expect(screen.getByText('Sede Norte')).toBeInTheDocument();
    });
  });

  it('muestra mensaje de error cuando falla la carga', async () => {
    const errorMessage = 'Error al cargar las sedes';
    (getLocations as any).mockRejectedValue(new Error(errorMessage));
    
    render(<Locations />);
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('formatea correctamente la fecha de creación', async () => {
    (getLocations as any).mockResolvedValue(mockLocations);
    
    render(<Locations />);
    
    await waitFor(() => {
      const dates = screen.getAllByText(/20 de marzo de 2024/);
      expect(dates).toHaveLength(2);
      expect(dates[0]).toHaveTextContent('20 de marzo de 2024, 05:00');
      expect(dates[1]).toHaveTextContent('20 de marzo de 2024, 06:00');
    });
  });
});
