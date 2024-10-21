import { Image, Select } from 'antd';
import { useEffect, useState } from 'react';
import { facultyOptions, yearOptions } from '../../data/routine';

const RoutineBoard = ({ flag }) => {
  const [year, setYear] = useState();
  const [faculty, setFaculty] = useState();
  const [routine, setRoutine] = useState();
  const [showRoutine, setShowRoutine] = useState(false);
  const [message, setMessage] = useState();
  const onSelectSearch = () => {};

  const fetchRoutine = async () => {
    if (year && faculty) {
      //fetch routine
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
        } else {
          setShowRoutine(false);
          setMessage(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchRoutine();
  }, [year, faculty]);
  useEffect(() => {
    fetchRoutine();
  }, [flag]);

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

  const deleteRoutine = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_ADDRESS
        }/admin/routine?year=${year}&faculty=${faculty}`,
        {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        alert('Routine deleted successfully');
        setRoutine([]); // Clear the routine data
        setShowRoutine(false); // Hide the routine section
        setYear(null); // Reset the year selection
        setFaculty(null); // Reset the faculty selection
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting the routine:', error);
      alert('Error deleting the routine');
    }
  };
  const handleDeleteRoutine = () => {
    if (window.confirm('Are you sure you want to delete this gallery?')) {
      deleteRoutine();
    }
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row mt-4 gap-8">
      <div className="w-full h-fit bg-white rounded-lg px-8 py-8 border-2 flex flex-col gap-4  ">
        <div className="text-[24px] font-semibold ">
          <span>Existing Routine</span>
        </div>
        {/* Routine form */}
        <div
          // encType="multipart/form-data"
          className="w-full flex flex-col gap-4 "
          // onSubmit={handlePublishClick}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
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
            <div className="flex flex-col gap-2">
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
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h1 className="font-semibold text-[20px]">Images:</h1>
            </div>
            {showRoutine == false ? (
              <>
                {year == null || faculty == null ? (
                  <div className="text-[16px] font-[Montserrat] text-neutral-400 select-none py-4">
                    Search Result will appear here!
                  </div>
                ) : (
                  <div className="text-[16px] font-[Montserrat] text-neutral-400 select-none py-4">
                    Routine not published!!!
                  </div>
                )}
              </>
            ) : (
              <div className="">
                {routine.map((r, index) => (
                  <div key={index} className="w-full h-fit flex  gap-4">
                    {r.images.map((image, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="flex justify-center  h-full w-full"
                      >
                        <Image
                          style={{
                            height: '16rem',
                            width: '100%',
                            objectFit: 'cover',
                          }}
                          src={
                            import.meta.env.VITE_SERVER_ADDRESS + '/' + image
                          }
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
        {year && faculty && showRoutine && (
          <div className="w-full flex justify-center ">
            <button
              onClick={handleDeleteRoutine}
              className="border-1 border-red-500 hover:bg-red-500 hover:text-white duration-200 py-2 px-6 "
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutineBoard;
