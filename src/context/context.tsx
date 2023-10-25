import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

type CSVRow = { [key: string]: string };

interface CsvContextType {
  csvData: CSVRow[];
  csvHeaders: string[];
  loading: boolean;
  setCsv: (data: CSVRow[], headers: string[]) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const CsvContext = createContext<CsvContextType | undefined>(undefined);

const CsvProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [csvData, setCsvData] = useState<CSVRow[]>([]);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const setCsv = (data: CSVRow[], headers: string[]) => {
    setCsvData(data);
    setCsvHeaders(headers);
  };

  return (
    <CsvContext.Provider
      value={{ csvData, csvHeaders, loading, setCsv, setLoading }}
    >
      {children}
    </CsvContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCsv = (): CsvContextType => {
  const context = useContext(CsvContext);
  if (!context) {
    throw new Error('useCsv must be used within a CsvProvider');
  }
  return context;
};

export default CsvProvider;