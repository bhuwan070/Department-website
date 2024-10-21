import { useEffect, useState } from 'react';
import { AiFillNotification } from 'react-icons/ai';
import { IoNotificationsOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const RecentNotice = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const getNotices = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/admin/notice/recent`
      );
      const data = await res.json();
      setNotices(data.data);
    };
    getNotices();
  }, []);
  return (
    <div className="w-full h-fit bg-white rounded-lg px-4 pb-6 pt-3">
      <div className="w-full flex flex-col gap-3 ">
        <h1 className="text-[24px] font-bold text-neutral-500">
          Recent Notices
        </h1>
        <div className=" flex flex-col gap-4">
          {notices.map((notice, key) => (
            <div key={key} className="flex flex-col">
              <Link
                to={`/notice/${notice.id}`}
                className="w-fit text-[16px] text-neutral-700 font-bold flex gap-2 items-center hover:text-secondary-400"
              >
                {/* <AiFillNotification /> */}
                <h1>{notice.title}</h1>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentNotice;
