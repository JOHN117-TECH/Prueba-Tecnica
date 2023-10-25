import Papa, { ParseResult } from 'papaparse';
import '../styles/Table.css';
import { useCsv } from '../context/context';
import { useNavigate } from 'react-router-dom';
type CSVRow = { [key: string]: string };

const Home = () => {
  const { setCsv, setLoading } = useCsv();
  const navigate = useNavigate();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setLoading(true);
    setTimeout(() => {
      if (file) {
        Papa.parse<CSVRow>(file, {
          complete: (result: ParseResult<CSVRow>) => {
            setCsv(result.data, Object.keys(result.data[0]));
            setLoading(false);
            navigate('/file');
          },
          header: true,
        });
      }
    }, 4000);
  };

  return (
    <>
      <div className="containerFile">
        <label>
          Subir archivo CSV
          <input type="file" onChange={handleFileChange} accept=".csv" />
        </label>
      </div>
    </>
  );
};

export default Home;
