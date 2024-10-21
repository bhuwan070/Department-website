const RoutineCard = ({ routine, image }) => {
  return (
    <div className="w-[40vw] h-14 flex border border-black ">
      <div className="flex gap-4 items-center px-4 border-r border-black">
        <span className="text-2xl">{routine?.year}</span>
      </div>
      <div className="flex grow items-center px-4 border-r border-black">
        <span className="uppercase text-2xl">{routine?.faculty}</span>
      </div>
      <div className="flex">
        <a
          className="font-medium text-xl px-4  h-full flex items-center hover:text-primary-600 "
          target="_blank"
          href={import.meta.env.VITE_SERVER_ADDRESS + '/' + image}
        >
          Open
        </a>
      </div>
    </div>
  );
};

export default RoutineCard;
