import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SingleGallery = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState();
  const location = useLocation();
  const pathname = location.pathname;
  const id = parseInt(pathname.split('/')[2]);
  useEffect(() => {
    const getGalleryImages = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/gallery/${id}`
      );
      const data = await res.json();
      setTitle(data.data.name);
      setImages(data.data.images);
    };
    getGalleryImages();
  }, []);
  console.log(images);
  return (
    <div className="min-h-screen w-full flex flex-col items-center mt-10 gap-10 ">
      <div className="flex-col md:flex-row flex w-[80%] justify-center items-center md:relative">
        <Link
          to={`/gallery`}
          className=" md:absolute left-0 text-[12px] md:text-[16px] underline "
        >
          Back to Gallery
        </Link>
        <span className="flex w-fit font-bold text-[26px] md:text-[32px] lg:text-[36px] border-primary-500 border-b-2 text-neutral-600 ">
          {title}
        </span>
      </div>
      <div className="w-[80%] ">
        {images ? (
          <div className="gallery w-full  ">
            {images.map((item, key) => (
              <div key={key} className="pics">
                <Image
                  className=""
                  src={import.meta.env.VITE_SERVER_ADDRESS + '/' + item}
                />
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-[20px] font-semibold text-neutral-400 ">
            No Images to show
          </h1>
        )}
      </div>
    </div>
  );
};

export default SingleGallery;
