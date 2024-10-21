import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const AdminNav = ({ menu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [logoutBox, setLogoutBox] = useState(false);
  const handleLogoutClick = async () => {
    const result = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/admin/logout`,
      {
        method: 'POST',
        credentials: 'include',
      }
    ).then((r) => {
      return r.json();
    });
    if (result.status === 'success') {
      navigate('/admin/login');
    }
  };

  // ${
  //   menu ? 'fixed z-[100] ' : 'hidden'
  // }

  return (
    <div>
      {logoutBox && (
        <div className="absolute  w-[100vw] h-[100%] bg-[#47474736] flex justify-center items-center z-[200]">
          <div className=" relative w-[20rem] h-fit border-2 py-2 bg-white text-center flex flex-col items-center ">
            <div className="w-[100%] flex justify-end p-2 gap-3 cursor-pointer">
              <img
                alt="close"
                width={20}
                height={20}
                src="/icons/close.png"
                onClick={() => {
                  setLogoutBox(false);
                }}
              />
            </div>
            <span className="text-2xl mb-5 z-[50]">Are you sure?</span>
            <div className=" w-[100%] h-[100%] items-center justify-center flex gap-4 px-3  ">
              <button
                onClick={handleLogoutClick}
                className="w-1/2 py-2 px-5 border border-black hover:bg-secondary-400 hover:text-white "
              >
                Logout
              </button>
              <button
                onClick={() => {
                  setLogoutBox(false);
                }}
                className="w-1/2 py-2 border border-black hover:bg-secondary-400 hover:text-white "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className={`w-[18rem] h-[100vh] fixed md:relative z-[100] ${
          menu ? 'translate-x-0' : '-translate-x-[18rem]'
        }  md:translate-x-0 md:flex flex-col items-center bg-white duration-300 `}
      >
        <div className="w-[18rem] h-full flex flex-col justify-between items-center fixed ">
          <div className="w-full h-full grow ">
            <div className="w-full h-[12rem] bg-secondary-900 flex justify-center items-center ">
              <span className="text-2xl text-white text-center ">
                Computer and Electronics Department
              </span>
            </div>
            {/* Admin Links */}
            <div>
              <ul className="w-full flex flex-col ">
                <Link
                  className={`p-4 duration-300 ${
                    path === '/admin'
                      ? 'bg-secondary-900 text-white'
                      : 'hover:bg-neutral-200'
                  } `}
                  to="/admin"
                >
                  Dashboard
                </Link>
                <Link
                  className={`p-4   duration-300 ${
                    path === '/admin/notice'
                      ? 'bg-secondary-900 text-white'
                      : 'hover:bg-neutral-200'
                  } `}
                  to="/admin/notice"
                >
                  Notice
                </Link>
                <Link
                  className={`p-4   duration-300 ${
                    path === '/admin/calendar'
                      ? 'bg-secondary-900 text-white'
                      : 'hover:bg-neutral-200'
                  } `}
                  to="/admin/calendar"
                >
                  Calendar
                </Link>

                <Link
                  className={`p-4   duration-300 ${
                    path === '/admin/routine'
                      ? 'bg-secondary-900 text-white'
                      : 'hover:bg-neutral-200'
                  } `}
                  to="/admin/routine"
                >
                  Routine
                </Link>
                <Link
                  className={`p-4   duration-300 ${
                    path === '/admin/gallery'
                      ? 'bg-secondary-900 text-white'
                      : 'hover:bg-neutral-200'
                  } `}
                  to="/admin/gallery"
                >
                  Gallery
                </Link>
              </ul>
            </div>
          </div>

          <div className="w-full">
            <button
              className="p-2 px-2 w-full bg-secondary-900 text-white text-lg hover:bg-blue-500 duration-300  "
              onClick={() => setLogoutBox(true)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
