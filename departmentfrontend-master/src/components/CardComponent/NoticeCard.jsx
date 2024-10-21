import { CalendarMonth } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NoticeCard = ({ notice }) => {
  const date = new Date(notice.created_at);
  console.log(notice);

  const formattedDate = date.toLocaleDateString('en-US', {
    timeZone: 'Asia/Kathmandu',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    timeZone: 'Asia/Kathmandu',
  });

  return (
    <div
      className={`w-full pb-4 h-full flex flex-col items-center font-[Montserrat] shadow-md gap-2 border-2 border-secondary-900 rounded-xl  `}
    >
      <div className="w-full h-[12rem] relative rounded-t-lg flex justify-center ">
        <div className="w-full h-full absolute top-0 left-0 z-10 bg-hero_background bg-cover opacity-20 bg-transparent rounded-t-xl"></div>
        <img
          alt=""
          width={150}
          height={100}
          src="/images/ioepc-logo.png"
          className=" object-contain w-[220px] z-20 "
        />
      </div>
      <div className="w-[90%] flex grow flex-col gap-2  ">
        <Link to={`/notice/${notice.id}`}>
          <div
            className={`xl:text-[16px] lg:text-[14px] font-bold hover:text-primary-400 transition-colors duration-300 font-[Raleway] `}
          >
            {notice.title}
          </div>
        </Link>
        <div className="text-neutral-500 font-sans font-semibold flex items-center gap-2 xl:text-[16px] lg:text-[14px]">
          <CalendarMonth color="inherit" />
          <span>{formattedDate}</span>

          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
