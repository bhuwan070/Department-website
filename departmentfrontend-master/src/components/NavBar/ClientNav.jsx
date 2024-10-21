import { Link, useLocation } from 'react-router-dom';
import ClientTopBanner from './ClientTopBanner';
import { useEffect, useState } from 'react';
import { IoMenuOutline } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';

const ClientNav = () => {
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const handleMenuClick = () => {
    setMenu(!menu);
  };

  useEffect(() => {
    setMenu(false);
  }, [location.pathname]);

  return (
    <div className="flex flex-col max-w-full items-center">
      <div className="w-full bg-white py-2 ">
        <ClientTopBanner />
      </div>
      <nav className="w-full py-2 h-fit flex justify-center items-center bg-blue-950">
        <ul className="xl:w-[90%] hidden lg:flex flex-wrap xl:gap-4 justify-center text-xl font-[Raleway]  font-medium text-white ">
          <Link to="/">
            <li className="px-[14px] py-2 h-[4rem] flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="px-[14px] py-2 h-[4rem] flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
              About
            </li>
          </Link>
          <Link to="/academic-calendar">
            <li className="px-[14px] py-2 h-[4rem] flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
              Academic Calendar
            </li>
          </Link>
          <Link to="/notice">
            <li className="px-[14px] py-2 h-[4rem] flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
              Notice
            </li>
          </Link>
          <Link to="/project">
            <li className="px-[14px] py-2 h-[4rem] flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
              Project
            </li>
          </Link>
          <Link to="/routine">
            <li className="px-[14px] py-2 h-[4rem] flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
              Routine
            </li>
          </Link>
          <Link to="/campus-officials">
            <li className="px-[14px] py-2 h-[4rem] flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
              Campus Officials
            </li>
          </Link>
          <Link to="/contact">
            <li className="px-[14px] py-2 h-[4rem] flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
              Contact Us
            </li>
          </Link>
        </ul>
        <div className="flex lg:hidden relative flex-col items-center h-full w-full ">
          <div className="w-[90%] h-full flex justify-end  ">
            <IoMenuOutline
              size="48px"
              color="white"
              onClick={handleMenuClick}
              className="p-1 cursor-pointer"
            />
          </div>
          <AnimatePresence>
            {menu && (
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                transition={{ duration: 0.2 }}
                exit={{ height: 0 }}
                className="xl:w-[80%] flex flex-col items-center text-xl font-[Raleway] font-medium text-white pb-2"
              >
                <Link to="/">
                  <li className=" px-3 py-2 h-fit flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
                    Home
                  </li>
                </Link>
                <Link to="/about">
                  <li className=" px-3 py-2 h-fit flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
                    About
                  </li>
                </Link>
                <Link to="/academic-calendar">
                  <li className=" px-3 py-2 h-fit flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
                    Academic Calendar
                  </li>
                </Link>
                <Link to="/notice">
                  <li className=" px-3 py-2 h-fit flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
                    Notice
                  </li>
                </Link>
                <Link to="/project">
                  <li className="px-3 py-2 h-fit flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
                    Project
                  </li>
                </Link>
                <Link to="/routine">
                  <li className=" px-3 py-2 h-fit flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
                    Routine
                  </li>
                </Link>
                <Link to="/campus-officials">
                  <li className=" px-3 py-2 h-fit flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
                    Campus Officials
                  </li>
                </Link>
                <Link to="/contact">
                  <li className=" px-3 py-2 h-fit flex items-center hover:text-primary-500 duration-300 cursor-pointer rounded-lg ">
                    Contact Us
                  </li>
                </Link>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
};

export default ClientNav;
