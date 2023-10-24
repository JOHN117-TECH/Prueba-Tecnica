import { useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
/* import { CSVLink } from 'react-csv'; */
import '../styles/Table.css';
import ReactPaginate from 'react-paginate';

type CSVRow = { [key: string]: string };

const CsvReader = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<CSVRow[]>([]);

  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    setLoading(true);

    setTimeout(() => {
      if (file) {
        Papa.parse<CSVRow>(file, {
          complete: (result: ParseResult<CSVRow>) => {
            setCsvData(result.data);
            if (result.data.length > 0) {
              const headers = Object.keys(result.data[0]);
              setCsvHeaders(headers);
            }
            setLoading(false);

            setSearchTerm('');
            setSearchResults(result.data);
          },
          header: true,
        });
      }
    }, 3000);
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
    <div>
      <div className="containerFile">
        <label>
          Subir archivo CSV
          <input type="file" onChange={handleFileChange} accept=".csv" />
        </label>
      </div>
      {loading ? (
        <div className="Loader">
          <p>Cargando...</p>
        </div>
      ) : (
        csvData.length > 0 && (
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
        )
      )}
    </div>
  );
};

export default CsvReader;
