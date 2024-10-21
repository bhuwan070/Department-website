// import FollowUs from '@/components/FollowUs';
// import NoticeCard from '@/components/NoticeCard';
// import RecentNotice from '@/components/RecentNotice';

import { useEffect, useState } from 'react';
import NoticeCard from '../components/CardComponent/NoticeCard';
import ReactPaginate from 'react-paginate';
import RecentNotice from '../components/Notice/RecentNotice';

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPage]);

  useEffect(() => {
    const getNotices = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER_ADDRESS
        }/admin/notice?page=${selectedPage}&limit=8`
      );
      const data = await res.json();
      setNotices(data.data);
      setTotalPage(data.total_pages);
    };
    getNotices();
  }, [selectedPage]);

  const handlePageClick = (data) => {
    // navigate(`/notice/page/${pageNumber}`);
    // setCurrentPage(pageNumber);
    // setLoading(true);

    setSelectedPage(data.selected + 1);
  };

  return (
    <div className="w-full min-h-screen py-16 flex justify-center bg-neutral-100 ">
      <div className="w-[90%] h-full flex gap-4 ">
        <div className="w-full flex-[3] flex flex-col gap-4 ">
          <div className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notices?.map((notice, index) => (
              <div key={index} className="w-full flex justify-center h-full ">
                <NoticeCard notice={notice} />
              </div>
            ))}
          </div>
          {notices && (
            <div className="flex w-full justify-center ">
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
          )}
        </div>
        <div className="hidden lg:flex flex-1">
          <RecentNotice />
        </div>
      </div>
    </div>
  );
};

export default Notice;

// export async function getServerSideProps() {
//   const initialData = await fetcher(
//     `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/admin/notice`
//   );
//   return { props: { initialData } };
// }
