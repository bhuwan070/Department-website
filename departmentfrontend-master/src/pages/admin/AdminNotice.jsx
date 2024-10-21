import { useEffect, useState } from 'react';
import NoticeBoard from '../../components/Admin/NoticeBoard';

const AdminNotice = () => {
  const [fileUrl, setFileUrl] = useState('');
  // const [loading, setLoading] = useState('false');
  const [flag, setFlag] = useState(0);
  const [error, setError] = useState('');
  const [isPDF, setIsPDF] = useState(false);

  useEffect(() => {
    console.log(fileUrl.data);
    setIsPDF(fileUrl?.toLowerCase().endsWith('.pdf'));
  }, [fileUrl]);
  const handleAddImage = () => {
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
    } else {
      // setImageUrl('');
    }
  };

  const handleResetClick = () => {
    const titleInput = document.getElementById('title');
    if (titleInput) {
      titleInput.value = '';
    }
    const contentInput = document.getElementById('content');
    if (contentInput) {
      contentInput.value = '';
    }

    const fileInput = document.getElementById('file');
    if (fileInput) {
      fileInput.value = '';
    }

    const previewImage = document.getElementById('preview');
    if (previewImage) {
      previewImage.src = '';
    }

    setFileUrl('');
  };

  const handlePublishClick = async (e) => {
    e.preventDefault();
    const title = document.getElementById('title');
    const file = document.getElementById('file');
    const content = document.getElementById('content');
    if (!title.value) {
      setError('Title is a required field!!!');
    } else if (!file.files[0]) {
      setError('File is a required field!!!');
    } else {
      try {
        //creating formData
        const formData = new FormData();
        formData.append('title', title.value);
        formData.append('file', file.files[0]);
        formData.append('content', content.value);

        //send data to server
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_ADDRESS}/admin/notice`,
          {
            method: 'POST',
            body: formData,
            credentials: 'include',
          }
        );
        const data = await response.json();
        if (data.status === 'success') {
          setFlag(flag + 1);
          handleResetClick();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full max-h-fit h-fit flex flex-col  bg-neutral-200 px-8 ">
      <div className="mt-6">
        <h1 className="text-4xl">Notice</h1>
      </div>
      {/* Notice Box */}
      <div className="w-full h-full flex flex-col lg:flex-row mt-4 gap-6 ">
        <div className="lg:flex-1 relative h-fit bg-white rounded-lg px-8 py-8 ">
          <div className="text-2xl font-semibold ">
            <span>Create a Notice</span>
          </div>
          <div className="text-red-500 absolute">{error}</div>
          {/* Notice form */}
          <form
            encType="multipart/form-data"
            className="w-full flex flex-col mt-4 gap-4 "
            onSubmit={handlePublishClick}
          >
            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="title" className="text-lg">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
                // required
              />
            </div>

            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="file">File (Image/PDF)</label>
              <input
                type="file"
                name="file"
                id="file"
                className="bg-neutral-100"
                onChange={(e) => handleAddImage(e)}
              />
              <div className={`${fileUrl ? 'flex' : 'hidden'}`}>
                {isPDF ? (
                  <iframe
                    id="preview"
                    src={fileUrl}
                    className="w-[70%] h-[16rem]"
                  ></iframe>
                ) : (
                  <img
                    src={fileUrl}
                    id="preview"
                    className="h-[16rem] w-[70%] object-contain "
                  />
                )}
              </div>
            </div>

            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="content" className="text-lg">
                Content
              </label>
              <textarea
                type="text"
                name="content"
                id="content"
                className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
              />
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
        <div className="flex-[1] flex">
          <NoticeBoard flag={flag} setFlag={setFlag} />
        </div>
      </div>
    </div>
  );
};

export default AdminNotice;
