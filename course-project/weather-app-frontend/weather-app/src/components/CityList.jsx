import { Link } from "react-router-dom";

const CityList = ({ cities, deleteCity }) => {
  console.log("cities", cities);
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full">
      {cities.map((city) => (
        <div key={city.id} className="bg-primary flex gap-5 items-center justify-between px-5 py-2 w-full rounded-md">
          <p className="flex text-xl">{city.name}</p>
          <div className="flex sm:flex-row flex-col gap-3">
            <Link to={`/weather/${city.name.toLowerCase().trim().replace(/\s+/g, "-")}`} state={city} className="bg-white border-amber-900 border-2 flex p-2 cursor-pointer rounded-md">Weather</Link>
            <Link to={`/overview/${city.name.toLowerCase().trim().replace(/\s+/g, "-")}`} state={city} className="bg-white border-amber-900 border-2 flex p-2 cursor-pointer rounded-md">Overview</Link>
            <button className="bg-red-200 border-amber-900 border-2 flex p-2 cursor-pointer rounded-md" onClick={() => deleteCity(city.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CityList;
