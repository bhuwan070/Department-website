import { useState } from 'react';
import GalleryTable from '../../components/Admin/GalleryTable';

const AdminGallery = () => {
  const [imageUrl, setImageUrl] = useState();

  const handlePublishClick = async (e) => {
    e.preventDefault();
    const name = document.getElementById('name');
    const files = document.getElementById('files');
    try {
      //creating formData
      const formData = new FormData();
      formData.append('name', name.value);
      // formData.append('files', files.files);
      for (let i = 0; i < files.files.length; i++) {
        formData.append('files', files.files[i]);
      }
      console.log(formData);

      //send data to server
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/gallery`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status === 'success') {
        handleResetClick();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetClick = () => {
    const nameInput = document.getElementById('name');
    if (nameInput) {
      nameInput.value = '';
    }

    const filesInput = document.getElementById('files');
    if (filesInput) {
      filesInput.value = '';
    }

    const previewImage = document.getElementById('preview');
    if (previewImage) {
      previewImage.src = '';
    }

    setImageUrl('');
  };

  const handleAddImage = () => {
    const filesInput = document.getElementById('files');
    const file = filesInput.files[0];
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

  return (
    <div className="w-full max-h-fit h-fit flex flex-col  bg-neutral-200 px-8 ">
      <div className="mt-6">
        <h1 className="text-[36px]">Gallery</h1>
      </div>
      {/* Gallery Box */}
      <div className="w-full h-full flex flex-col mt-4 gap-6 ">
        <div className="lg:flex-1 h-fit bg-white rounded-lg px-8 py-8 ">
          <div className="text-[26px] font-semibold ">
            <span>Create a Gallery</span>
          </div>
          {/* Gallery form */}
          <form
            encType="multipart/form-data"
            className="w-full flex flex-col mt-4 gap-4 "
            onSubmit={handlePublishClick}
          >
            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="name" className="text-lg">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-neutral-100 py-2 rounded-lg px-2 outline-none "
              />
            </div>

            <div className="flex flex-col w-full gap-2 ">
              <label htmlFor="files">Images</label>
              <input
                type="file"
                name="files"
                id="files"
                className="bg-neutral-100"
                multiple
                onChange={(e) => handleAddImage(e)}
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
        <div className="flex-[1] flex">
          <GalleryTable />
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
