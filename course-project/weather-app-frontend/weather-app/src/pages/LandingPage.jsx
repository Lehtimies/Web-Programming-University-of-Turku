import { useEffect, useState } from "react";
import cityService from "../services/cities";
import CityList from "../components/CityList";
import CityForm from "../components/CityForm";
import Error500Page from "./Error500Page";

const LandingPage = () => {
  const [cities, setCities] = useState([]);
  const [newName, setNewName] = useState("");
  const [status, setStatus] = useState("loading"); // loading | success | error
  console.log("App component rendered");

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("useEffect called");
        console.log("Fetching cities...");

        // Fetch the city data from the API
        const citiesData = await cityService.getAll()
        console.log("promise Fulfilled");

        // Check if the response is an error
        if (citiesData.error) throw new Error("Failed to fetch cities data");

        // If the city data is successfully fetched, then update the cities variable and set the status to success
        setCities(citiesData);
        setStatus("success");
      } catch (error) {
        console.error("Error loading data:", error);
        setStatus("error");
      }
    }

    // Call the loadData function to fetch the city data
    loadData();
  }, []);
  console.log("status:", status);

  // If the status is loading, then display nothing
  if (status === "loading") return null;

  // If the status is an error, then display the appropriate error message
  if (status === "error") {
    return (
      <Error500Page />
    )
  }
  console.log("cities:", cities);
  console.log("render", cities.length, "cities");

  const deleteCity = async (id) => {
    if (!confirm("Delete this city?")) return;
    console.log("Deleting city with id:", id);
    cityService
      .remove(id)
      .then((response) => {
        if (response.error) {
          throw new Error(response.error);
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
    if (cities.some((city) => city.name === newName)) {
      alert("City already added!");
      return;
    }
    // Make a new city object
    const newCity = {
      name: newName,
    };
    console.log("newCity:", newCity);

    // Send the new city object to the server
    cityService.create(newCity)
      .then((response) => {
        console.log("Post response:", response);
        if (response.error) {
          throw new Error(response.error);
        }
        setCities(cities.concat(response));
      })
      .catch(error => {
        alert(`Error adding city: ${error.message}`);
        console.error("Error adding city:", error.message);
        return;
      });
      setNewName("");
      console.log("City added:", newName);
    };

  const handleNameChange = (event) => {
    console.log("newName:", event.target.value);
    setNewName(event.target.value);
  };

  // Example icon code, replace with actual logic to get the icon code
  // Actually intended for weather page
  const icon = "01d";

  return (
    <div className="text-center flex w-full item bg-blue">
      <div className="flex flex-col items-center w-full justify-center my-5 mx-10">
        <div className="flex flex-col gap-5 md:w-3/4 w-full">
          <h1 className="text-3xl text-left text-white">Saved Cities:</h1>
          <hr className="h-1 w-full border-0 bg-gray-500" />
          <CityForm
            addCity={addCity}
            newName={newName}
            handleNameChange={handleNameChange}
          />
          <CityList cities={cities} deleteCity={deleteCity} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
