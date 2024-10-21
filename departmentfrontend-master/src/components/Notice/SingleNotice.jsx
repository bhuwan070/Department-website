import { useEffect, useState } from 'react';
import { MdDateRange } from 'react-icons/md';
import { useLocation } from 'react-router-dom';
import RecentNotice from './RecentNotice';

const SingleNotice = () => {
  const [notice, setNotice] = useState([]);
  const [isPDF, setIsPDF] = useState(false);
  const [noticeDateTime, setNoticeDateTime] = useState();
  const location = useLocation();
  const pathname = location.pathname;
  const id = parseInt(pathname.split('/')[2]);

  useEffect(() => {
    const getNotice = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/admin/notice/${id}`
      );
      const data = await res.json();
      setNotice(data.data[0]);
    };
    getNotice();
  }, [id]);

  // date and time conversion
  useEffect(() => {
    let d = new Date(notice?.created_at);
    const date = d.toLocaleString();
    setNoticeDateTime(date);
  }, [notice]);

  useEffect(() => {
    setIsPDF(notice?.file?.endsWith('.pdf'));
  }, [notice]);

  return (
    <div className="min-h-screen w-full flex justify-center ">
      <div className="w-[80%] py-10 px-2 flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 ">
          <h1 className="text-3xl font-bold">{notice.title}</h1>
          <div className="text-neutral-500 font-bold flex items-center gap-1 ">
            <MdDateRange size="18px" />
            <span>{noticeDateTime}</span>
          </div>
          <hr className="border-2 " />
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-3  ">
          <div className="flex-[3] bg-white flex justify-center p-4 rounded-lg">
            {isPDF ? (
              <div className="flex-[2] flex flex-col items-center bg-white px-4 py-4 rounded-lg ">
                <iframe
                  className="w-full h-[50rem] "
                  src={`${import.meta.env.VITE_SERVER_ADDRESS}/${notice.file}`}
                ></iframe>
                <div className="flex gap-4">
                  <a
                    target="_blank"
                    href={`${import.meta.env.VITE_SERVER_ADDRESS}/${
                      notice.file
                    }`}
                    className="py-2 px-2 my-2 bg-secondary-900 text-white rounded-lg "
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
            ) : (
              <a
                href={`${import.meta.env.VITE_SERVER_ADDRESS}/${notice.file}`}
                target="__blank"
                className="w-fit h-fit flex flex-[3] justify-center"
              >
                <img
                  className="w-[40rem] object-contain "
                  src={`${import.meta.env.VITE_SERVER_ADDRESS}/${notice.file}`}
                ></img>
              </a>
            )}
          </div>
          <div className="flex-1">
            <RecentNotice />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNotice;
