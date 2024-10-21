import { Link } from 'react-router-dom';
import AcesExcessMsg from '../components/Home/AcesExcessMsg';
import FAQ from '../components/Home/FAQ';
import HomeCarousel from '../components/Home/HomeCarousel';
import HomeVideo from '../components/Home/HomeVideo';
import Messages from '../components/Home/Messages';
import RecentNotice from '../components/Notice/RecentNotice';
import Gallery from './Gallery';

const Home = () => {
  return (
    <div className="max-w-screen h-fit flex flex-col gap-4 py-4 ">
      {/* <div className="h-fit">
        <HomeCarousel />
      </div> */}
      <div className="w-full flex justify-center  ">
        <div className="w-[90%] md:w-[80%] flex flex-col lg:flex-row gap-4 bg-white rounded-xl py-6 px-4  ">
          <div className="lg:w-1/2 w-full h-full flex items-center ">
            <HomeVideo />
          </div>
          <div className="lg:w-1/2 w-full ">
            <div className="flex flex-col gap-2 ">
              <h1 className="text-[22px] xl:text-[24px] font-bold text-secondary-800 ">
                Welcome to Purwanchal Campus
              </h1>
              <p className="text-[16px] text-justify">
                Purwanchal Campus, formerly known as Eastern Region (ERC) Campus
                is one of constituent campuses of Tribhuvan University (TU) and
                one of the associate engineering campuses of Institute of
                Engineering (IOE) which is a comprehensive, non-profit making
                institution and pioneering institution of higher education level
                in Nepal funded by Government of Nepal.Currently this campus
                runs seven (Agricultural, Architecture, Civil, Computer,
                Electrical, Electronics Communication & Information, Mechanical)
                bachelors degree program and one (Land and Water) master degree
                program It is situated at Gangalal Marg, Tinkune, Dharan-8,
                Sunsari district in the eastern region of Nepal. It occupies an
                area of 443 ropani (34-13-11.75 Bigahas)
              </p>
              <div className="flex flex-col gap-4">
                <Link to="/about" className="underline text-secondary-800 ">
                  See More
                </Link>
                <Link
                  to="/gallery"
                  className="text-white bg-black w-fit py-2 px-8 rounded-lg "
                >
                  Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Messages />
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[90%] md:w-[80%] xl:flex gap-4">
          <div className="flex-[3] pb-4">
            <AcesExcessMsg />
          </div>
          <div className="flex-[1] hidden md:flex  ">
            <RecentNotice />
          </div>
        </div>
      </div>
      {/* <div className="w-full flex justify-center">
        <div className="w-[80%] ">
          <Gallery />
        </div>
      </div> */}
      <div className="w-full flex">
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
