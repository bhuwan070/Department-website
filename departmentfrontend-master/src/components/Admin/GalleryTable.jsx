import { Image } from 'antd';
import { useEffect, useRef, useState } from 'react';

const GalleryTable = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(true);
  const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const fetchGalleries = async () => {
    const result = await fetch(
      `${import.meta.env.VITE_SERVER_ADDRESS}/api/gallery/info`,
      {
        credentials: 'include',
      }
    ).then((r) => {
      return r.json();
    });
    if (result.status === 'success') {
      setGalleries(result.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGalleries();
  }, [selectedGalleryImages]);
  useEffect(() => {
    fetchGalleries();
  }, []);
  useEffect(() => {
    fetchGalleries();
  }, [galleries]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (id) => {
    if (!selectedFiles.length) {
      alert('No image selected!!!');
      return;
    }

    try {
      const formData = new FormData();

      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }

      // Update existing gallery
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/gallery/${id}/images`,
        {
          method: 'POST',
          body: formData,
        }
      ).then((r) => r.json());

      if (response.status === 'success') {
        alert('Gallery updated successfully!');

        // Clear selected files and reset input
        setSelectedFiles([]);
        fileInputRef.current.value = null;

        // Append new images to the current state
        const newImages = response.data.images; // Use the returned images
        setSelectedGalleryImages((prevImages) => [...prevImages, ...newImages]);
      } else {
        alert('Failed to update gallery.');
        setMessage('Failed to update gallery.');
      }
    } catch (error) {
      console.error('Error uploading gallery:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const deleteGalleryImage = async (galleryId, imageId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_ADDRESS
        }/api/gallery/${galleryId}/images/${imageId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setSelectedGalleryImages((prevImages) =>
          prevImages.filter((image) => image.id !== imageId)
        );
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting the image:', error);
      alert('Error deleting the image');
    }
  };
  const handleDelete = (galleryId, imageId) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteGalleryImage(galleryId, imageId);
    }
  };
  const handleDeleteGallery = (galleryId) => {
    if (window.confirm('Are you sure you want to delete this gallery?')) {
      deleteGallery(galleryId);
    }
  };
  const deleteGallery = async (galleryId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/gallery/${galleryId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setGalleries((prevGalleries) =>
          prevGalleries.filter((gallery) => gallery.id !== galleryId)
        );
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting the gallery:', error);
      alert('Error deleting the gallery');
    }
  };

  return (
    <div className="w-full max-h-[20rem] flex flex-col bg-white px-8 py-4 rounded-lg  ">
      {editMode && (
        <div className="absolute top-0 left-0 py-12 flex justify-center items-center w-screen min-h-screen h-screen overflow-y-auto bg-[#00000059] z-[200]">
          <div className="w-full flex flex-col justify-center items-center  ">
            <div className="w-[80%] lg:w-[60%] flex flex-col gap-2 ">
              <div className="flex justify-between  ">
                <div></div>
                <button
                  onClick={() => {
                    setSelectedGallery(null);
                    setSelectedGalleryImages(null);
                    setEditMode(false);
                  }}
                  className="text-neutral-50 text-[32px] font-mono cursor-pointer hover:text-neutral-300 duration-200 "
                >
                  x
                </button>
              </div>
              <div className="flex flex-wrap gap-2 w-[90%] ">
                {selectedGalleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center justify-center"
                  >
                    <Image
                      src={`${import.meta.env.VITE_SERVER_ADDRESS}/${
                        image.image_path
                      }`}
                      alt={image}
                      style={{
                        width: '10rem',
                        objectFit: 'contain',
                      }}
                      className="w-[10rem] object-contain "
                    />
                    <button
                      onClick={() => handleDelete(selectedGallery, image.id)}
                      className=" text-background-50 z-[100] bottom-0 text-[16px] font-mono cursor-pointer hover:text-red-600 duration-200 "
                    >
                      delete
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 w-full justify-center  ">
                <div className="bg-white p-4 flex flex-col gap-4 rounded-lg ">
                  <h1 className="font-semibold text-[18px]">
                    Add Image to Gallery:
                  </h1>
                  <div className="w-1/4 flex ">
                    <input
                      ref={fileInputRef}
                      className=""
                      id="files"
                      type="file"
                      name="files"
                      multiple
                      accept="*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="w-1/4 flex  ">
                    <button
                      onClick={() => handleSubmit(selectedGallery)}
                      className="text-sm duration-300 border-1 border-primary-500  hover:bg-primary-500 hover:text-white md:px-3 px-2 py-1 cursor-pointer"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h1 className="text-[26px] font-semibold ">Existing Galleries:</h1>
        <table className=" w-[100%] text-center mx-auto mb-4 ">
          <thead>
            <tr className="font-bold md:text-lg text-sm">
              <td>Sn</td>
              <td>Name</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : (
              <>
                {galleries && galleries.length > 0 ? (
                  galleries.map((gallery, id) => (
                    <tr key={id} className="md:text-base text-sm">
                      <td>{id + 1}</td>
                      <td>{gallery.name}</td>
                      <td>
                        <div className="w-full flex items-center justify-center mt-1 gap-2 ">
                          <div
                            onClick={() => {
                              setSelectedGallery(gallery.id);
                              setSelectedGalleryImages(gallery.images);
                              setEditMode(true);
                            }}
                            className=" text-sm duration-300 border-1 border-primary-500  hover:bg-primary-500 hover:text-white md:px-3 px-2 py-1 cursor-pointer"
                          >
                            Edit
                          </div>
                          <div
                            onClick={() => handleDeleteGallery(gallery.id)}
                            className=" text-sm duration-300 border-1 border-primary-500  hover:bg-primary-500 hover:text-white md:px-3 px-2 py-1 cursor-pointer "
                          >
                            Delete
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No data to show</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GalleryTable;
