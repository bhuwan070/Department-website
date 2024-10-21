import { Image, Select } from 'antd';
import { useState } from 'react';
import { facultyOptions, yearOptions } from '../data/routine';

const Routine = () => {
  const [year, setYear] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [message, setMessage] = useState('');
  const [routine, setRoutine] = useState([]);
  const [images, setImages] = useState([]);
  const [showRoutine, setShowRoutine] = useState(false);

  const onSelectSearch = () => {};

  const handleResetClick = () => {
    setYear(null);
    setFaculty(null);
    setShowRoutine(false);
  };

  const handleSubmitClick = async () => {
    if (!year && !faculty) setMessage('Select Year and Faculty!!!');
    else if (!year) setMessage('Select Year!!!');
    else if (!faculty) setMessage('Select Faculty!!!');

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_ADDRESS
        }/admin/routine?year=${year}&faculty=${faculty}`
      );
      const data = await response.json();
      if (data.status === 'success') {
        setShowRoutine(true);
        setRoutine(data.data);
        setRoutine(convertStringToArray(data.data));
        setMessage(null);
      } else {
        setShowRoutine(false);
        setMessage(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const convertStringToArray = (routines) => {
    return routines.map((routine) => {
      let imagesArray = [];
      try {
        imagesArray = JSON.parse(routine.images);
      } catch (error) {
        console.error('Failed to parse images:', error);
      }
      return {
        ...routine,
        images: imagesArray,
      };
    });
  };
  return (
    <section className="w-full min-h-screen flex justify-center pt-10 pb-10">
      <div className="w-[80%] flex flex-col items-center border bg-neutral-100 rounded-xl ">
        <div className="pt-4 relative h-[100px] w-full text-center ">
          <h1 className="text-3xl ">Search Routine:</h1>
          <span className="absolute left-0 text-red-500 font-semibold text-sm text-center w-full ">
            {message && message}
          </span>
        </div>
        <div className="flex gap-5 ">
          <div className="flex items-center gap-4">
            <label htmlFor="year">Year:</label>
            <Select
              id="year"
              showSearch
              placeholder="Select Year"
              optionFilterProp="label"
              value={year}
              onChange={(value) => {
                setYear(value);
              }}
              onSearch={onSelectSearch}
              options={yearOptions}
            />
          </div>
          <div className="flex items-center gap-4">
            <label htmlFor="faculty">Faculty:</label>
            <Select
              id="faculty"
              showSearch
              placeholder="Select Faculty"
              optionFilterProp="label"
              value={faculty}
              onChange={(value) => {
                setFaculty(value);
              }}
              onSearch={onSelectSearch}
              options={facultyOptions}
            />
          </div>
          <div className="flex items-center h-full gap-2">
            <button
              onClick={handleSubmitClick}
              className="border px-3 h-full rounded-lg hover:bg-secondary-400 hover:text-white duration-200 "
            >
              Search
            </button>
            <button
              onClick={handleResetClick}
              className="border px-3 h-full rounded-lg hover:bg-primary-600 hover:text-white duration-200 "
            >
              Reset
            </button>
          </div>
        </div>

        <div className="pt-10">
          {year == null || faculty == null || showRoutine == false ? (
            <>
              <div className="text-3xl font-[Montserrat] text-neutral-400 select-none py-4">
                Search Result will appear here!
              </div>
            </>
          ) : (
            <div className="">
              {routine.map((r, index) => (
                <div
                  key={index}
                  className="w-full h-fit flex justify-center py-4 px-4 rounded-lg gap-4"
                >
                  {r.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="flex justify-center w-full">
                      <Image
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                        src={import.meta.env.VITE_SERVER_ADDRESS + '/' + image}
                        alt="routine"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Routine;
