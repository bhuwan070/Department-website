import { Button, Empty, Image, Modal } from 'antd';
import { useEffect, useState } from 'react';

const CalendarBoard = (props) => {
  const [calendar, setCalendar] = useState('');
  const [open, setOpen] = useState(false);
  const [isPDF, setIsPDF] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    'Are you sure you want to delete the existing calendar?'
  );
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/api/calendar/${calendar.id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
    setCalendar('');
    setOpen(false);
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const getCalendar = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/api/calendar`
    );
    const data = await res.json();
    setCalendar(data.data[0]);
  };
  useEffect(() => {
    getCalendar();
  }, [props.flag]);
  useEffect(() => {
    getCalendar();
  }, []);
  useEffect(() => {
    setIsPDF(calendar.file?.toLowerCase().endsWith('.pdf'));
  }, [calendar]);

  return (
    <section className="w-full lg:w-[60%] h-full flex flex-col items-center gap-4 bg-white p-4 rounded-lg">
      {calendar ? (
        <div className="w-full flex flex-col gap-4 items-center ">
          <div className="w-[90%] flex flex-col gap-4 items-center ">
            <h1 className="text-2xl font-semibold text-center ">
              Existing Calendar
            </h1>
            <div className="w-full">
              {isPDF ? (
                <iframe
                  className="w-full h-[20rem] "
                  src={`${import.meta.env.VITE_SERVER_ADDRESS}/${
                    calendar.file
                  }`}
                ></iframe>
              ) : (
                <Image
                  className="w-full object-contain "
                  src={`${import.meta.env.VITE_SERVER_ADDRESS}/${
                    calendar.file
                  }`}
                />
              )}
            </div>
          </div>
          <div className="flex w-full justify-center ">
            <Button type="primary" onClick={showModal} className="bg-red-500 ">
              Delete
            </Button>
            <Modal
              title="Title"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <p>{modalText}</p>
            </Modal>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <span className="text-lg text-primary-300 flex flex-col text-center">
            There is no calendar to show!
            <span className="text-neutral-400">
              Post calendar from the form above!!!
            </span>
          </span>
          <div>
            <Empty />
          </div>
        </div>
      )}
    </section>
  );
};

export default CalendarBoard;
