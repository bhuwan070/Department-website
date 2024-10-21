import { Outlet, useLocation } from 'react-router-dom';
import ClientNav from '../components/NavBar/ClientNav';
import Footer from '../components/Footer';
import { useEffect } from 'react';

const ClientLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div className="max-w-screen ">
      <ClientNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ClientLayout;
