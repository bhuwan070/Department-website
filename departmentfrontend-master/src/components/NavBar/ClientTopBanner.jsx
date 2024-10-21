import { FiPhone } from 'react-icons/fi';
import { GoMail } from 'react-icons/go';

const ClientTopBanner = () => {
  return (
    <section className=" h-32 flex w-full justify-center  ">
      <div className="w-[80%] flex flex-col lg:flex-row ">
        <div className="flex-1 flex justify-center md:justify-start">
          <img
            src="/images/ioepc-logo.png"
            alt="ioepc"
            className="h-[6rem] lg:h-full "
          />
        </div>
        <div className="flex-1 flex justify-between md:justify-end items-end md:gap-5 font-[Montserrat]">
          <div className="group flex items-center gap-2 duration-300 ">
            <GoMail className="text-secondary-700 text-[15px] md:text-[18px] group-hover:text-primary-700 duration-300" />
            <a
              href="mailto:ioepcd@ioepc.edu.np"
              className="font-semibold text-[15px] md:text-[18px] text-secondary-700 group-hover:text-primary-700 duration-300 "
            >
              ioepcd@ioepc.edu.np
            </a>
          </div>
          <div className="group flex items-center gap-2">
            <FiPhone className="text-secondary-700 group-hover:text-primary-700 text-[15px] md:text-[18px] duration-300" />
            <a
              href="tel:+980123457"
              className="font-semibold text-[15px] md:text-[18px] text-secondary-700 group-hover:text-primary-700 duration-300"
            >
              980123457
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientTopBanner;
