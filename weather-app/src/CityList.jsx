import City from "./City";

const CityList = ({ cities, deleteCity }) => {
  console.log("cities", cities);
  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full">
      {cities.map((city) => (
        <div key={city.id} className="bg-amber-400 flex gap-5 items-center justify-between px-5 py-2 w-full rounded-md">
          <p className="flex text-xl">{city.name}</p>
          <div className="flex sm:flex-row flex-col gap-3">
            <a className="bg-white flex p-2 cursor-pointer rounded-md" href={`/weather/${city.name}`}>Weather</a>
            <a className="bg-white flex p-2 cursor-pointer rounded-md" href={`/overview/${city.name}`}>Overview</a>
            <button className="bg-white flex p-2 cursor-pointer rounded-md" onClick={() => deleteCity(city.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CityList;
