import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminNav from '../components/NavBar/AdminNav';
import { useEffect, useState } from 'react';
import { IoClose, IoMenu } from 'react-icons/io5';

const AdminLayout = () => {
  const [menu, setMenu] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/admin/isAdmin`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((result) => {
        return result.json();
      });
      if (response.status === 'success') {
        return;
      } else {
        navigate('/admin/login');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    setMenu(false);
  }, [pathname]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex h-screen">
            <div className="w-fit ">
              <AdminNav menu={menu} />
            </div>
            <div
              className={` md:hidden fixed ${
                menu ? 'translate-x-[18rem] ' : 'translate-x-0'
              }  bg-secondary-900 py-2 pr-2 pl-1 z-[100] cursor-pointer rounded-r-md duration-300 `}
              onClick={() => setMenu(!menu)}
            >
              {menu ? (
                <IoClose size="20px" color="white" />
              ) : (
                <IoMenu size="20px" color="white" />
              )}
            </div>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default AdminLayout;
