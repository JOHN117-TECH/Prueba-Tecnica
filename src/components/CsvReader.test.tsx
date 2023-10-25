import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CSVReader from './Home';
import { describe,test } from 'vitest';
describe('CsvReader', () => {
  test('Carga y muestra un archivo CSV', async () => {
    render(<CSVReader />);
    const fileInput = screen.getByRole('button', { name: 'Subir archivo CSV' });

    // Simula la carga de un archivo CSV
     const csvData = 'Nombre,Edad\nAlice,30\nBob,25\nCharlie,35';
    const file = new File([csvData], 'data.csv', { type: 'text/csv' });
    userEvent.upload(fileInput, file);
  
    // Verifica que el mensaje de carga esté presente
    const loadingText = screen.getByText('Cargando...');
    expect(loadingText).toBeInTheDocument();
  
    // Espera a que desaparezca el mensaje de carga y aparezca la tabla
    await waitFor(() => {
      expect(screen.queryByText('Cargando...')).toBeNull();
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  
    // Verifica que los datos del archivo se muestran en la tabla
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(4); // Encabezado + 3 filas de datos
  
    const headers = screen.getAllByRole('columnheader');
    expect(headers).toHaveLength(2); // Dos columnas: Nombre y Edad
  
    const cells = screen.getAllByRole('cell');
    expect(cells).toHaveLength(8); // 4 filas x 2 columnas
  
    const cellValues = cells.map((cell) => cell.textContent);
    expect(cellValues).toEqual([
      'Nombre',
      'Edad',
      'Alice',
      '30',
      'Bob',
      '25',
      'Charlie',
      '35',
    ]); 
  });
});
