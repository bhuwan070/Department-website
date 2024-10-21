import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// const images = [
//   {
//     id: 1,
//     image:
//       'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     id: 2,
//     image:
//       'https://cdn.ioepc.edu.np/wp-content/uploads/2023/05/ERC_2019_srgb-768x512.jpg',
//   },
//   {
//     id: 3,
//     image:
//       'https://cdn.ioepc.edu.np/wp-content/uploads/2023/05/ERC_2019_srgb-768x512.jpg',
//   },
//   {
//     id: 4,
//     image:
//       'https://cdn.ioepc.edu.np/wp-content/uploads/2023/05/ERC_2019_srgb-768x512.jpg',
//   },
//   {
//     id: 4,
//     image:
//       'https://cdn.ioepc.edu.np/wp-content/uploads/2023/05/ERC_2019_srgb-768x512.jpg',
//   },
//   {
//     id: 4,
//     image:
//       'https://cdn.ioepc.edu.np/wp-content/uploads/2023/05/ERC_2019_srgb-768x512.jpg',
//   },
// ];

const Gallery = () => {
  const [galleries, setGalleries] = useState();

  useEffect(() => {
    const getGalleries = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_ADDRESS}/api/gallery`
      );
      const data = await res.json();
      setGalleries(data.data);
    };
    getGalleries();
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center">
      <h1 className="text-4xl text-primary-500 font-semibold my-4">Gallery:</h1>
      {/* {images ? (
        <div className="gallery w-full px-8 ">
          {images.map((item, key) => (
            <div key={key} className="pics">
              <Image className="" src={item.image} />
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-[20px] font-semibold text-neutral-400 ">
          No Images to show
        </h1>
      )} */}
      {galleries ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full px-8 gap-8 ">
          {galleries.map((item, key) => {
            console.log(item);
            return (
              <Link
                to={`/gallery/${item.id}`}
                key={key}
                className="pics h-[14rem] flex flex-col items-center"
              >
                <div className="h-full">
                  <img
                    className="w-full h-full object-cover "
                    src={
                      import.meta.env.VITE_SERVER_ADDRESS + '/' + item.images[0]
                    }
                    alt=""
                  />
                </div>
                <div>
                  <span className="text-black font-bold text-[26px]">
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h1 className="text-[20px] font-semibold text-neutral-400 ">
          No Images to show
        </h1>
      )}
    </section>
  );
};

export default Gallery;
