import { Select } from 'antd';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit, setLimit] = useState(15);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPage]);

  useEffect(() => {
    setSelectedPage(1);
  }, [title, category]);

  useEffect(() => {
    const searchProjects = async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER_ADDRESS
        }/api/project/search?title=${title}&&category=${category}&&page=${selectedPage}&&limit=${limit}`
      );
      const data = await res.json();

      setProjects(data.data);
      setTotalPage(data.total_pages);
    };
    searchProjects();
  }, [title, category, selectedPage]);

  const handlePageClick = (data) => {
    setSelectedPage(data.selected + 1);
  };

  return (
    <section className="h-fit w-full flex justify-center items-start ">
      <div className=" min-h-screen py-4 flex flex-col gap-4 w-full p-2 xl:w-[80%] justify-start items-center ">
        <div className="flex items-center w-full ">
          <form className="min-w-[20rem] px-2 md:px-0 w-full md:w-[80%] lg:w-[60%] xl:w-[50%] mx-auto flex items-center gap-4 ">
            <div className="relative w-full flex items-center">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                value={title}
                autoComplete="off"
                onChange={(e) => setTitle(e.target.value)}
                className="flex bg-white w-full py-3 ps-10 text-sm text-gray-900 border outline-none  rounded-lg "
                placeholder="Search project by titles..."
                required
              />
              {/* <button
                type="submit"
                className="text-white absolute right-2 bg-secondary-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
              >
                Search
              </button> */}
            </div>
            <div className="h-full ">
              <Select
                id="category"
                defaultValue={''}
                showSearch
                style={{ width: 140 }}
                placeholder="Select Category"
                optionFilterProp="label"
                value={category}
                onChange={(value) => {
                  setCategory(value);
                }}
                options={[
                  { value: '', label: 'Select Category' },

                  {
                    value: 'major',
                    label: 'major',
                  },
                  {
                    value: 'minor',
                    label: 'minor',
                  },
                ]}
              />
            </div>
          </form>
        </div>
        <div className="flex w-full lg:w-[80%]  ">
          <table className="w-full text-left rtl:text-right text-gray-500 flex flex-col text-sm lg:text-lg ">
            <thead className="text-xs lg:text-sm text-gray-700 uppercase bg-gray-50 rounded-t-lg ">
              <tr className="flex w-full">
                <th scope="col" className="px-6 py-3">
                  SN
                </th>
                <th scope="col" className="px-6 py-3 grow">
                  Project Title
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Link
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, key) => (
                <tr key={key} className="bg-white border-b flex w-full">
                  <th
                    scope="row"
                    className="px-7 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {(selectedPage - 1) * limit + key + 1}
                  </th>
                  <td className="px-7 py-4 grow">{project.title}</td>
                  <td className="px-7 py-4 ">{project.category}</td>
                  <td className="px-7 py-4">
                    <a
                      href={`${import.meta.env.VITE_SERVER_ADDRESS}/${
                        project.file
                      }`}
                      target="__blank"
                    >
                      See
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {projects && (
          <div className="flex mx-auto ">
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
    </section>
  );
};

export default Project;
