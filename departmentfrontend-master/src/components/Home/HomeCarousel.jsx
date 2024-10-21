import { Carousel } from 'antd';

const images = [
  {
    id: 1,
    image: '/images/home-carousel/1.jpg',
  },
  {
    id: 2,
    image: '/images/home-carousel/2.jpg',
  },
  {
    id: 3,
    image: '/images/home-carousel/3.jpg',
  },
  {
    id: 4,
    image: '/images/home-carousel/4.jpg',
  },
];

const HomeCarousel = () => {
  return (
    <Carousel
      arrows
      dots={false}
      infinite
      // autoplay
      autoplaySpeed={5000}
      speed={1000}
      effect="fade"
      arrowSize=""
      className="h-fit w-full flex justify-center items-center"
    >
      {images.map((item, key) => (
        <div key={key} className="h-full ">
          <img
            src={item.image}
            alt={'image' + item.id}
            className="max-h-[480px] object-cover w-full"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default HomeCarousel;
