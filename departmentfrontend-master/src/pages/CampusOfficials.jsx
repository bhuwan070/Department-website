import OfficialCard from '../components/CardComponent/OfficialCard';
import { officials } from '../data/campusofficials';

const CampusOfficials = () => {
  console.log(officials);
  return (
    <section className="w-full min-h-screen flex justify-center ">
      <div className="w-[80%] flex flex-col items-center  ">
        <h1 className="text-4xl font-semibold font-[Montserrat] pt-5 text-neutral-500 border-b-2 p-2 border-primary-600 ">
          Campus Officials
        </h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-5 ">
          {officials.map((official, key) => (
            <OfficialCard key={key} official={official} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusOfficials;
