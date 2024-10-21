import { Select } from 'antd';
import { useState } from 'react';
import RoutineBoard from '../../components/Admin/RoutineBoard';
import { facultyOptions, yearOptions } from '../../data/routine';

const AdminRoutine = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [year, setYear] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [flag, setFlag] = useState(0);
  const handlePublishClick = async (e) => {
    e.preventDefault();
    // const title = document.getElementById('title');
    const image = document.getElementById('image');
    try {
      //creating formData
      const formData = new FormData();
      formData.append('year', year);
      formData.append('faculty', faculty);
      // formData.append('title', title.value);
      // formData.append('image', image.files[0]);
      for (let i = 0; i < image.files.length; i++) {
        formData.append('image', image.files[i]);
      }

      //send data to server
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/admin/routine`,
        {
          method: 'POST',
          body: formData,
          credentials: 'include',
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.status == 'success') {
        handleResetClick();
        setFlag(flag + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetClick = () => {
    // const titleInput = document.getElementById('title');
    // if (titleInput) {
    //   titleInput.value = '';
    // }

    const imageInput = document.getElementById('image');
    if (imageInput) {
      imageInput.value = '';
    }

    const previewImage = document.getElementById('preview');
    if (previewImage) {
      previewImage.src = '';
    }
    setYear(null);
    setFaculty(null);
    setImageUrl('');
  };

  const handleAddImage = () => {
    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];
    if (file) {
      let reader = new FileReader();
      const blob = new Blob([file], { type: file.type });

      reader.readAsDataURL(blob);
      reader.onload = function (event) {
        document.getElementById('preview').src = event.target.result;
        setImageUrl(event.target.result);
      };
    } else {
      // setImageUrl('');
    }
  };

  const onSelectSearch = () => {};

  return (
    <div className="w-full  min-h-screen h-fit flex flex-col bg-neutral-200 px-8 ">
      <div className="mt-6">
        <h1 className="text-4xl">Routine</h1>
      </div>
      {/* Routine Box */}
      <div className="flex gap-4">
        <div className="w-1/3 h-full flex flex-col lg:flex-row mt-4 gap-8">
          <div className="w-full h-fit bg-white rounded-lg px-8 py-8 border-2  ">
            <div className="text-2xl font-semibold ">
              <span>Create a Routine</span>
            </div>
            {/* Routine form */}
            <form
              encType="multipart/form-data"
              className="w-full flex flex-col mt-4 gap-3 "
              onSubmit={handlePublishClick}
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

              <div className="flex flex-col w-full gap-2 ">
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  multiple
                  className="bg-neutral-100"
                  onChange={(e) => handleAddImage(e)}
                  required
                />
                <div className={`${imageUrl ? 'flex' : 'hidden'}`}>
                  <img
                    width={10}
                    height={10}
                    alt="image"
                    id="preview"
                    src={imageUrl}
                    className="w-[10rem] object-contain"
                  />
                </div>
              </div>

              <div className="w-full flex px-2 gap-4">
                <button
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg "
                  type="submit"
                >
                  Publish
                </button>
                <button
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 rounded-lg"
                  onClick={handleResetClick}
                  type="button"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-2/3 flex">
          <RoutineBoard flag={flag} />
        </div>
      </div>
    </div>
  );
};

export default AdminRoutine;
