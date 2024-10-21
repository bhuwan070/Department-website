import { useState } from 'react';
import CalendarBoard from '../../components/Admin/CalendarBoard';

const AdminCalendar = () => {
  const [fileUrl, setFileUrl] = useState();
  const [flag, setFlag] = useState(0);
  const handlePublishClick = async (e) => {
    e.preventDefault();
    // const title = document.getElementById('title');
    const file = document.getElementById('file');
    try {
      //creating formData
      const formData = new FormData();
      formData.append('file', file.files[0]);

      //send data to server
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/calendar`,
        {
          method: 'POST',
          credentials: 'include',
          body: formData,
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
    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.value = '';
    }

    const previewFile = document.getElementById('preview');
    if (previewFile) {
      previewFile.src = '';
    }
    setFileUrl('');
  };
  const handleAddFile = () => {
    const fileInput = document.getElementById('file');
    const file = fileInput.files[0];
    if (file) {
      let reader = new FileReader();
      const blob = new Blob([file], { type: file.type });

      reader.readAsDataURL(blob);
      reader.onload = function (event) {
        document.getElementById('preview').src = event.target.result;
        setFileUrl(event.target.result);
      };
    }
  };

  return (
    <div className="w-full min-h-full max-h-fit h-fit py-4 flex flex-col items-center bg-neutral-200 px-8 ">
      <div className="mt-6">
        <h1 className="text-4xl">Academic Calendar</h1>
      </div>
      <div className="w-full flex flex-col items-center  mt-4 gap-8">
        <div className="h-fit w-full bg-white flex flex-col items-center rounded-lg px-8 py-8 border-2 lg:w-[50%]  ">
          <div className="text-2xl font-semibold ">
            <span>Post Academic Calendar</span>
          </div>
          <form
            encType="multipart/form-data"
            className="w-full flex flex-col items-center mt-4 gap-4 "
            onSubmit={handlePublishClick}
          >
            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="image">File:</label>
              <input
                type="file"
                name="file"
                id="file"
                className="bg-neutral-100"
                onChange={(e) => handleAddFile(e)}
                required
              />
              <div className={`${fileUrl ? 'flex' : 'hidden'}  `}>
                <iframe
                  id="preview"
                  src={fileUrl}
                  className="w-[70%] h-[16rem]"
                ></iframe>
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
      <div className="w-full lg:w-[80%] flex justify-center mt-10 ">
        <CalendarBoard flag={flag} />
      </div>
    </div>
  );
};

export default AdminCalendar;
