import { Button, Empty, Modal } from 'antd';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const NoticeBoard = ({ flag, setFlag }) => {
  const [notices, setNotices] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState(
    'Are you sure you want to delete the existing calendar?'
  );
  const [noticeId, setNoticeId] = useState(null);
  const showModal = (notice) => {
    setNoticeId(notice.id);
    setOpen(true);
  };
  const handleOk = async (notice) => {
    setConfirmLoading(true);
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/admin/notice/${noticeId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    );
    setNotices([]);
    setFlag(flag + 1);
    setOpen(false);
    setConfirmLoading(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const getNotices = async () => {
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_ADDRESS
      }/admin/notice?page=${selectedPage}&limit=${limit}`
    );
    const data = await res.json();
    setNotices(data.data);
    setTotalPage(data.total_pages);
  };
  useEffect(() => {
    getNotices();
  }, [flag]);

  useEffect(() => {
    getNotices();
  }, [selectedPage]);

  useEffect(() => {
    getNotices();
  }, []);

  const handlePageClick = async (data) => {
    setSelectedPage(data.selected + 1);
  };

  return (
    <section className="w-full h-full flex flex-col items-center gap-4 bg-white p-4 rounded-lg grow">
      {notices ? (
        <div className="w-full h-full flex flex-col gap-4 items-center ">
          <div className=" grow flex flex-col w-full items-center ">
            <div className="w-[90%] flex flex-col gap-4 items-center">
              <h1 className="text-2xl font-semibold text-center ">Notices</h1>
              <div className="w-full flex flex-col gap-2">
                {notices.map((notice, key) => (
                  <div
                    key={key}
                    className="flex w-full px-4 py-2 rounded-lg items-center gap-4 bg-neutral-200 "
                  >
                    <div className="w-full grow flex items-center ">
                      <Link to={`/notice/${notice.id}`}>{notice.title}</Link>
                    </div>
                    <div className="flex">
                      <Button
                        type="primary"
                        onClick={() => showModal(notice)}
                        className="bg-red-500 "
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Modal
            title="Title"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
          <div className="flex ">
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              pageCount={totalPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <span className="text-lg text-primary-300 flex flex-col text-center">
            There is no notice to show!
            <span className="text-neutral-400">
              Post Notice from the form above!!!
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

export default NoticeBoard;
