import { messages } from '../../data/data';

const Messages = () => {
  return (
    <div
      className={` mx-auto w-[90%] md:w-[80%] h-fit grid grid-cols-1 lg:grid-cols-2 gap-4 xl:gap-20 font-[Montserrat] text-white`}
    >
      {messages?.map((message, index) => (
        <div
          className="relative xl:w-full h-full rounded-xl py-6 px-4 md:px-8 flex flex-col gap-4 justify-between bg-white "
          key={index}
        >
          {/* <div className="w-full h-full absolute left-0 top-0 bg-secondary-400 shadow-lg rounded-xl -z-[10]"></div> */}
          {/* <div className="w-full h-full absolute left-0 top-0 bg-gradient-radial from-[#e08c3e] to-[#dd6515] shadow-lg rounded-xl -z-[10]"></div> */}
          <div className="w-full h-full grid gap-2 lg:gap-4  ">
            <span className="text-[18px] md:text-[20px] font-bold text-primary-600  ">
              Message From {message.position}
            </span>
            <p
              className={`font-[Montserat,sans] text-gray-600 text-[14px] md:text-[16px] max:h-[24rem] min-h-fit `}
            >
              {message.content}
            </p>
          </div>
          <div className="w-full grid md:grid-cols-2 lg:gap-20 gap-4 ">
            <div className="flex items-center justify-center ">
              <img
                alt="Image"
                width={10}
                height={10}
                src={message && message.image}
                className="h-[200px] w-[200px] object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center lg:w-[80%] ">
              <span className="text-[14px] md:text-[16px] text-sky-600 font-bold ">
                {message.name}
              </span>
              <span
                className={`text-neutral-400 text-[12px] md:text-[15px] font-[Montserrat]`}
              >
                {message.faculty}
              </span>
            </div>
          </div>
        </div>
        // <div>Hello</div>
      ))}

      {/* <div className="w-full h-[30rem] border-2 "></div>
      <div className="w-full h-[30rem] border-2 "></div> */}
    </div>
  );
};

export default Messages;
