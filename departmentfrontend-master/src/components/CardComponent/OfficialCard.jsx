import { message, Space } from 'antd';
import { BiLogoGmail } from 'react-icons/bi';
import { CgMail } from 'react-icons/cg';
import { CiMail } from 'react-icons/ci';
import { FaPhoneAlt } from 'react-icons/fa';
import { LuMail } from 'react-icons/lu';

const OfficialCard = ({ official }) => {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <section className="w-full min-h-[18rem] flex flex-col items-center gap-2 py-2  rounded-xl hover:shadow-2xl duration-300">
      <div className="w-[10rem] h-[10rem] rounded-full border-2 border-primary-600 flex ">
        <img
          src={official.image}
          alt=""
          className="w-full object-top h-full object-cover rounded-full p-1 "
        />
      </div>
      <div className="w-full flex flex-col items-center   ">
        <h1 className="text-2xl leading-9 text-primary-600 font-semibold ">
          {official.name}
        </h1>
        <span className="text-md text-neutral-500 w-[60%] text-center leading-4 ">
          {official.faculty}
        </span>
      </div>
      <div className="flex gap-4 py-2">
        {contextHolder}
        <Space>
          <LuMail
            className="p-2 bg-neutral-200 rounded-full cursor-pointer duration-200 hover:text-secondary-600 hover:bg-neutral-300 "
            size="36px"
            onClick={() => {
              navigator.clipboard.writeText(`${official.gmail}`).then(() => {
                messageApi
                  .open({
                    type: 'success',
                    content: 'Mail copied to clipboard',
                  })
                  .catch(() => {
                    messageApi.open({
                      type: 'error',
                      content: 'Failed to copy to clipboard',
                    });
                  });
              });
            }}
          />
        </Space>
        <Space>
          <a href={`tel:${official.contact}`}>
            <FaPhoneAlt
              className="p-2 bg-neutral-200 rounded-full cursor-pointer duration-200 hover:text-secondary-600 hover:bg-neutral-300 "
              size="36px"
              onClick={() => {
                navigator.clipboard
                  .writeText(`${official.contact}`)
                  .then(() => {
                    messageApi.open({
                      type: 'success',
                      content: 'Phone Number copied to clipboard',
                    });
                  })
                  .catch(() => {
                    messageApi.open({
                      type: 'error',
                      content: 'Failed to copy to clipboard',
                    });
                  });
              }}
            />
          </a>
        </Space>
      </div>
    </section>
  );
};

export default OfficialCard;
