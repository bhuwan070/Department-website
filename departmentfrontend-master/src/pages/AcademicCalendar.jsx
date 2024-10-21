import { useEffect, useState } from 'react';
import RecentNotice from '../components/Notice/RecentNotice';

const AcademicCalendar = () => {
  const [calendar, setCalendar] = useState('');
  const [isPDF, setIsPDF] = useState(false);

  useEffect(() => {
    const getCalendar = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/calendar`
      );
      const data = await res.json();
      setCalendar(data.data[0].file);
    };
    getCalendar();
  }, []);
  useEffect(() => {
    setIsPDF(calendar.toLowerCase().endsWith('.pdf'));
  }, [calendar]);

  return (
    <section className="py-16 w-full flex justify-center ">
      <div className="w-[90%] lg:w-[60%]  flex flex-col lg:flex-row gap-4">
        <div className="flex-[3] flex flex-col gap-4 ">
          <h1 className="text-3xl lg:text-4xl font-bold">Academic Calendar</h1>
          <hr className="border-4" />
          <div className="flex gap-4">
            {isPDF ? (
              <div className="flex-[2] flex flex-col items-center bg-white px-4 py-4 rounded-lg ">
                <iframe
                  className="w-full h-[30rem] "
                  src={`${import.meta.env.VITE_SERVER_ADDRESS}/${calendar}`}
                ></iframe>
                <div className="flex gap-4">
                  <a
                    target="_blank"
                    href={`${import.meta.env.VITE_SERVER_ADDRESS}/${calendar}`}
                    className="py-2 px-2 my-2 bg-secondary-900 text-white rounded-lg "
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
            ) : (
              <a
                href={`${import.meta.env.VITE_SERVER_ADDRESS}/${calendar}`}
                target="__blank"
                className="w-fit h-fit flex flex-[3] justify-center "
              >
                <img
                  className="w-[60rem] object-contain "
                  src={`${import.meta.env.VITE_SERVER_ADDRESS}/${calendar}`}
                ></img>
              </a>
            )}
            <div className="flex-1">
              <RecentNotice />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicCalendar;
