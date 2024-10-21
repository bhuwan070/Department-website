// import Loading from '@/utils/loading';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    username: '',
    password: '',
  });
  const [passwordType, setPasswordType] = useState('password');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  // console.log(import.meta.env.VITE_SERVER_ADDRESS)
  const handleLoginClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/admin/login`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(details),
        }
      ).then((result) => {
        return result.json();
      });
      if (response.status === 'success') {
        navigate('/admin');
      } else {
        setMessage(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center ">
      <div className="w-fit  md:w-[25rem] h-fit flex flex-col items-center py-8 shadow-lg rounded-lg shadow-[#20202060] ">
        <div className="text-4xl relative">
          <span>Admin Login</span>
          {message && (
            <div className="text-base w-full flex justify-center text-red-500 absolute ">
              {' '}
              {message}{' '}
            </div>
          )}
        </div>
        <div className="flex flex-col w-[80%] gap-4 mt-12 ">
          <input
            type="name"
            name="username"
            id="username"
            placeholder="Username"
            className="outline-none border-[1px] border-black rounded-md p-1 px-2 bg-neutral-100 text-lg w-full "
            autoComplete="off"
            value={details.username}
            onChange={(e) => {
              setDetails({ ...details, username: e.target.value });
            }}
          />
          <div className="relative flex items-center">
            {details.password !== '' && (
              <div className="absolute right-0 h-full flex items-center rounded-md px-2">
                {passwordType === 'password' ? (
                  <div
                    className="w-[1.6rem] h-[1.6rem] hover:bg-neutral-200 cursor-pointer flex justify-center items-center rounded-full"
                    onClick={() => {
                      setPasswordType('name');
                    }}
                  >
                    <VisibilityOff fontSize="inherit" />
                  </div>
                ) : (
                  <div
                    className="w-[1.6rem] h-[1.6rem] hover:bg-neutral-200 cursor-pointer flex justify-center items-center rounded-full"
                    onClick={() => {
                      setPasswordType('password');
                    }}
                  >
                    <Visibility fontSize="inherit" />
                  </div>
                )}
              </div>
            )}

            <input
              type={`${passwordType}`}
              name="password"
              id="password"
              placeholder="Password"
              className="outline-none border-[1px] border-black rounded-md p-1 px-2 bg-neutral-100 text-lg w-full "
              value={details.password}
              autoComplete="off"
              onChange={(e) => {
                setDetails({ ...details, password: e.target.value });
              }}
            />
          </div>
          <div
            className="py-2 rounded-md text-lg bg-[#4A8CC5] cursor-pointer flex justify-center items-center text-white hover:bg-[#4a8cc5e5] "
            onClick={handleLoginClick}
          >
            {loading ? (
              <div className="w-[1.4rem] h-[1.4rem]  ">
                <div className="border-2 rounded-full border-t-transparent text-grey-800 animate-spin text-4xl"></div>
                {/* <Loading color="white" /> */}
              </div>
            ) : (
              <div>Log In</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
