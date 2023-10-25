import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CsvProvider from './context/context';
import Home from './components/Home';
import RootPage from './pages/RootPage';
import CvsReader from './pages/CvsReader';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootPage />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/file',
          element: <CvsReader />,
        },
      ],
    },
  ]);

  return (
    <>
      <CsvProvider>
        <RouterProvider router={router} />
      </CsvProvider>
    </>
  );
}

export default App;
