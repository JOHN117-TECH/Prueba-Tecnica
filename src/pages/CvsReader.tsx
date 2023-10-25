import { useState } from 'react';
import { useCsv } from '../context/context';
import ReactPaginate from 'react-paginate';

type CSVRow = { [key: string]: string };

const CvsReader = () => {
  const { csvData, csvHeaders} = useCsv();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<CSVRow[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  function handleSearch() {
    const filteredResults = csvData.filter((row) => {
      return Object.values(row).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setSearchResults(filteredResults);
    setSearchTerm('');
  }

  return (
    <>
      {csvData.length > 0 && (
        <div>
          <div className="containerMain">
            <div className="containerForm">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button onClick={handleSearch}>Buscar</button>
            </div>
          </div>
          <h2>Cargue de Facturas</h2>
          <table className="table">
            <thead>
              <tr>
                {csvHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {searchResults
                .slice(
                  currentPage * itemsPerPage,
                  (currentPage + 1) * itemsPerPage
                )
                .map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {csvHeaders.map((header) => (
                      <td
                        key={header}
                        className={
                          row[header] === 'Pendiente'
                            ? 'truePendiente'
                            : row[header] === 'En progreso'
                            ? 'trueEnProgreso'
                            : row[header] === 'Pagado'
                            ? 'truePagado'
                            : row[header] === 'Rechazada'
                            ? 'trueRechazada'
                            : ''
                        }
                      >
                        {row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
          <ReactPaginate
            pageCount={Math.ceil(searchResults.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
          {/* <CSVLink data={csvData} headers={csvHeaders}>
              Descargar CSV
            </CSVLink> */}
        </div>
      )}
    </>
  );
};

export default CvsReader;
