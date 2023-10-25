import { Outlet } from 'react-router-dom';
import Header from '../components/layouts/Header';

const RootPage = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootPage;
