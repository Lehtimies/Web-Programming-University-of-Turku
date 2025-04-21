import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import cityService from "../services/cities";
import weatherService from "../services/weather";
import Error404Page from "../pages/Error404Page";
import Error500Page from "../pages/Error500Page";
import GeneralWeatherDescription from "../components/GeneralWeatherDescription";
import WeatherContainer from "../components/WeatherContainer";
import WindVisibilityContainer from "../components/WindVisibilityContainer";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";

const WeatherPage = () => {
  console.log("WeatherPage component rendered");
  const { cityName } = useParams();
  const location = useLocation();
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("location.state:", location.state);
        console.log("cityName:", cityName);
        // declare a variable to hold the city data from the state (if the user navigated from the front page)
        let cityData = location.state;
        // If the city data is not found in the state, then fetch it from the API
        if (!cityData) {
          const cities = await cityService.getAll();
          cityData = cities.find((responseCity) => responseCity.name.toLowerCase().trim().replace(/\s+/g, "-") === cityName);
          // If the city is not found, then set the status to error and return
          if (!cityData) throw new Error("City not found");
        }
        // If the city data is found, then update the city variable
        setCity(cityData);

        // Fetch the weather data for the city and check if the response is an error
        const weatherData = await weatherService.getWeatherById(cityData.id);
        if (weatherData.error) throw new Error("Failed to fetch weather data");

        // If the weather data is found, then update the weather variable and set the status to success
        setWeather(weatherData);
        setStatus("success");
      } catch (error) {
        console.error("Error loading data:", error);
        setStatus("error");
      }
    };
    // Call the loadData function to fetch the city and weather data
    loadData();
  }, [location.state, cityName]);

  // If the status is loading, then display nothing
  if (status === "loading") return null;
  
  // If the status is an error, then display the appropriate error message
  if (status === "error") {
    // If the city is not found, then display a 404 error page
    if (!city) {
      return (
        <Error404Page />
      )
    }
  
    // If the weather data is not found, then display a 500 error page
    if (!weather) {
      return (
        <Error500Page />
      )
    }
  }

  const formatUnixTime = (timestamp, timezone) => {
    return new Date((timestamp) * 1000).toLocaleTimeString("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="flex flex-col gap-3 w-max-4xl md:w-3/4 w-full text-white items-center justify-center mt-5 mb-10 mx-10">
      <div className="flex md:flex-row flex-col gap-4 items-center justify-between w-full">
        <div className="flex flex-row gap-2 items-center justify-start w-full">
          <p className="text-3xl">{city.name},</p>
          <p className="text-3xl">{formatUnixTime(weather.current.dt, weather.timezone)}</p>
          <img
            className="flex w-10 h-10"
            src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`}
            alt="Weather_icon"
          />
        </div>
        <div className="flex items-center md:justify-end justify-start w-full">
          <p className="flex whitespace-nowrap">Timezone: {weather.timezone}</p>
        </div>
      </div>
      <hr className="h-1 w-full border-0 mb-4 bg-gray-500" />
      <div className="flex flex-col gap-8 items-center justify-center w-full">
        <GeneralWeatherDescription weather={weather} />
        <div className="grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 md:gap-5 gap-8 w-full">
          <WeatherContainer weather={weather} />
          <WindVisibilityContainer weather={weather} />
        </div>
        <HourlyForecast weather={weather} />
        <DailyForecast weather={weather} />
      </div>
    </div>
  );
};

export default WeatherPage;
