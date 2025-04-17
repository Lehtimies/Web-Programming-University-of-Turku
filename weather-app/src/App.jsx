import { useState, useEffect } from "react";
import cityService from "./services/cities";
import weatherService from "./services/weather";
import CityList from "./CityList";
import CityForm from "./CityForm";

console.log("Running mode:", import.meta.env.MODE);

// Test code for backend endpoints
const getTurku = async () => {
  weatherService
    .getWeatherById("67f5b3467118df0cdbae9815")
    .then((response) => {
      console.log("current: ", response.current);
      //window.alert(JSON.stringify(response.current.temp));
      window.alert("turku pressed");
    })
    .catch((error) => console.error("Error fetching data:", error));
};

const App = () => {
  const [cities, setCities] = useState([]);
  const [newName, setNewName] = useState("");
  console.log("App component rendered");

  useEffect(() => {
    console.log("useEffect called");
    console.log("Fetching cities...");
    cityService.getAll().then((response) => {
      console.log("promise Fulfilled");
      setCities(response);
    });
  }, []);
  console.log("cities:", cities);
  console.log("render", cities.length, "cities");

  const deleteCity = async (id) => {
    if (!confirm("Delete this city?")) return;
    console.log("Deleting city with id:", id);
    cityService
      .remove(id)
      .then((response) => {
        if (response.error) {
          alert(`Error deleting city: ${response.error}`);
          console.error("Error deleting city:", response.error);
          return;
        }
        console.log("response:".response);
        setCities(cities.filter((city) => city.id !== id));
      })
      .catch((error) => {
        alert(`Error deleting city: ${error.message}`);
        console.error("Error deleting city:", error.message);
        return;
      });
    console.log("City deleted:", id);
  };

  const addCity = async (event) => {
    event.preventDefault();
    console.log("Adding city:", newName);
    if(cities.some(city => city.name === newName)) {
      alert("City already added!");
      return;
    }
    // Make a new city object
    const newCity = {
      name: newName
    }
    console.log("newCity:", newCity);

    // Send the new city object to the server
    cityService.create(newCity)
      .then(response => {
        console.log("Post response:", response);
        setCities(cities.concat(response));
        setNewName("");
      })
  }

  const handleNameChange = (event) => {
    console.log("newName:", event.target.value);
    setNewName(event.target.value);
  }

  // Example icon code, replace with actual logic to get the icon code
  // Actually intended for weather page
  const icon = "01d";

  return (
    <div className="text-center item bg-blue">
      <h1 className="text-8xl text-white">Amazing Weather App!</h1>
      <p className="text-2xl mt-10 text-red-500">Under Maintenance ;D</p>
      <div className="flex items-center justify-center my-10 mx-20">
        <div className="flex flex-col gap-10 md:w-2/3 w-full">
        <div className="flex flex-col">
          <p className="flex text-xl text-white">Test icon:</p>
          <img className="flex w-1/10" src={`https://openweathermap.org/img/wn/${icon}.png`} alt="Weather_icon" />
        </div>
          <CityForm addCity={addCity} newName={newName} handleNameChange={handleNameChange} />
          <CityList cities={cities} deleteCity={deleteCity} />
        </div>
      </div>
    </div>
  );
};

export default App;
