import { Link } from 'react-router-dom';
import CalendarBoard from '../../components/Admin/CalendarBoard';
import GalleryTable from '../../components/Admin/GalleryTable';
import NoticeBoard from '../../components/Admin/NoticeBoard';
import RoutineBoard from '../../components/Admin/RoutineBoard';

const Admin = () => {
  return (
    <section className="min-h-screen h-screen w-full  ">
      <div className="w-full h-1/5 flex flex-col items-center px-4 py-4 gap-2">
        <h1 className="text-3xl font-semibold">Admin Panel</h1>
        <p className="text-center text-lg text-red-500 w-[60%]">
          This page contains all the content and has ability to change or delete
          the content which directly change the content of the website. So, be
          careful before making any changes.
        </p>
      </div>
      <div className="flex h-4/5  ">
        <div className="w-full px-4 grid grid-cols-4 gap-4">
          <div className="w-full h-[16rem] bg-white p-4 flex flex-col items-center  ">
            <div className="text-[24px] font-semibold ">Notice</div>
            <div className="flex-grow flex justify-center  ">
              <img
                src="/icons/notice.png"
                alt=""
                className="w-[80px] object-contain"
              />
            </div>
            <div className="flex gap-4">
              <Link
                to={'/notice'}
                className="px-4 py-1 border-1 border-secondary-800 hover:bg-secondary-800 hover:text-white duration-200"
              >
                Visit
              </Link>
              <Link
                to={'/admin/notice'}
                className="px-4 py-1 border-1 border-secondary-800 hover:bg-secondary-800 hover:text-white duration-200"
              >
                Manage
              </Link>
            </div>
          </div>

          <div className="w-full h-[16rem] bg-white p-4 flex flex-col items-center  ">
            <div className="text-[24px] font-semibold ">Academic Calendar</div>
            <div className="flex-grow flex justify-center  ">
              <img
                src="/icons/academic.png"
                alt=""
                className="w-[80px] object-contain"
              />
            </div>
            <div className="flex gap-4">
              <Link
                to={'/academic-calendar'}
                className="px-4 py-1 border-1 border-secondary-800 hover:bg-secondary-800 hover:text-white duration-200"
              >
                Visit
              </Link>
              <Link
                to={'/admin/calendar'}
                className="px-4 py-1 border-1 border-secondary-800 hover:bg-secondary-800 hover:text-white duration-200"
              >
                Manage
              </Link>
            </div>
          </div>

          <div className="w-full h-[16rem] bg-white p-4 flex flex-col items-center  ">
            <div className="text-[24px] font-semibold ">Routine</div>
            <div className="flex-grow flex justify-center  ">
              <img
                src="/icons/routine.png"
                alt=""
                className="w-[80px] object-contain"
              />
            </div>
            <div className="flex gap-4">
              <Link
                to={'/routine'}
                className="px-4 py-1 border-1 border-secondary-800 hover:bg-secondary-800 hover:text-white duration-200"
              >
                Visit
              </Link>
              <Link
                to={'/admin/routine'}
                className="px-4 py-1 border-1 border-secondary-800 hover:bg-secondary-800 hover:text-white duration-200"
              >
                Manage
              </Link>
            </div>
          </div>

          <div className="w-full h-[16rem] bg-white p-4 flex flex-col items-center  ">
            <div className="text-[24px] font-semibold ">Gallery</div>
            <div className="flex-grow flex justify-center  ">
              <img
                src="/icons/gallery.png"
                alt=""
                className="w-[80px] object-contain"
              />
            </div>
            <div className="flex gap-4">
              <Link
                to={'/gallery'}
                className="px-4 py-1 border-1 border-secondary-800 hover:bg-secondary-800 hover:text-white duration-200"
              >
                Visit
              </Link>
              <Link
                to={'/admin/gallery'}
                className="px-4 py-1 border-1 border-secondary-800 hover:bg-secondary-800 hover:text-white duration-200"
              >
                Manage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
