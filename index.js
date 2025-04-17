require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const app = express();
const City = require("./models/city");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("dist"));

// Test data
// let cities = require("./test-data.json");

// Load the Weather Map API key from .env and confirm it's set
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
if (!WEATHER_API_KEY) {
  console.error("WEATHER_API_KEY is not set in the environment variables.");
  process.exit(1);
}

/**
 * Functions to handle city and weather data below
 */

// Code to generate id for test data
const generateId = () => {
  return String(Math.floor(Math.random() * 1000000));
};

// Function to get the location data of a city
const getCityLocation = async (cityName) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${WEATHER_API_KEY}`
    );

    // If the response status is 200 and the data array is not empty, the city exists
    if (response.status === 200 && response.data.length > 0) {
      const { name, lat, lon } = response.data[0];
      console.log(`City: ${name}, Latitude: ${lat}, Longitude: ${lon}`);

      // Return the city name, latitude, and longitude
      return { name, lat, lon, error: null, code: 200 };
    } else {
      // If the data array is empty, the city does not exist
      console.log(`City: ${cityName} does not exist`);
      return { error: "City does not exist", code: 404 };
    }
  } catch (error) {
    console.error("Error checking city existence:", error.message);
    return { error: "Error checking city existence", code: 500 };
  }
};

// Helper function to get city by id
const getCityById = async (id) => {
  try {
    const city = await City.findById(id);
    if (city) {
      console.log("City found:", city);
      return city;
    } else {
      console.error("City not found with id:", id);
      return null;
    }
  } catch (error) {
    console.error("Error fetching city by id:", error.message);
    return null;
  }
};

// Function to get weather data by city id
const getWeatherById = async (id) => {
  const city = await getCityById(id);

  // Check if the city exists
  if (!city) {
    return { data: null, error: "City not found", code: 404 };
  }

  // Get the latitude and longitude of the city
  const { lat, lon } = city;
  console.log("City coordinates:", lat, lon);

  try {
    // Fetch the weather data from the OpenWeatherMap API
    const response = await axios.get(
      // Exclude minutely, hourly, and daily data to get current weather only
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,daily&appid=${WEATHER_API_KEY}`
    );
    console.log("Weather data response:", response.data);

    // Check if the response status is 200 and return the data
    if (response.status === 200) {
      return { data: response.data, error: null, code: 200 };
    } else {
      // If the response status is not 200, return an error message
      console.error("Error fetching weather data:", response.statusText);
      return {
        data: null,
        error: "Error fetching weather data",
        code: response.status,
      };
    }
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    return { data: null, error: "Error fetching weather data", code: 500 };
  }
};

// Function to get weather overview by city id
const getOverviewById = async (id) => {
  const city = await getCityById(id);

  // Check if the city exists
  if (!city) {
    return { data: null, error: "City not found", code: 404 };
  }

  // Get the latitude and longitude of the city
  const { lat, lon } = city;
  console.log("City coordinates:", lat, lon);

  try {
    // Fetch the weather data from the OpenWeatherMap API
    const response = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall/overview?lon=${lon}&lat=${lat}&units=metric&appid=${WEATHER_API_KEY}`
    );
    console.log("Weather overview response:", response.data);

    // Check if the response status is 200 and return the data
    if (response.status === 200) {
      return { data: response.data, error: null, code: 200 };
    } else {
      // If the response status is not 200, return an error message
      console.error("Error fetching overview:", response.statusText);
      return {
        data: null,
        error: "Error fetching overview",
        code: response.status,
      };
    }
  } catch (error) {
    console.error("Error fetching overview:", error.message);
    return { data: null, error: "Error fetching overview", code: 500 };
  }
};

// Set up a simple endpoint for the root URL
app.get("/", (request, response) => {
  response.send("<h2>Server is running!</h2>");
});

/**
 * The following endpoints are for managing cities:
 * 1. GET /api/cities - Get all cities
 * 2. GET /api/cities/:id - Get a city by ID
 * 3. DELETE /api/cities/:id - Delete a city by ID
 * 4. POST /api/cities - Add a new city
 */

// Endpoint to get all cities
app.get("/api/cities", (request, response) => {
  try {
    City.find({}).then((cities) => {
      response.status(200).json(cities);
    });
  } catch (error) {
    console.error("Error fetching cities:", error.message);
    response.status(500).json({ error: "Failed to fetch cities" });
  }
});

// Endpoint to get a city by ID
app.get("/api/cities/:id", async (request, response) => {
  const id = request.params.id;
  const city = await getCityById(id);
  if (city) {
    response.json(city);
  } else {
    response.status(404).end();
  }
});

// Endpoint to delete a city
app.delete("/api/cities/:id", (request, response) => {
  const id = request.params.id;
  City.findByIdAndDelete(id)
    .then((result) => {
      if (result) {
        console.log("City deleted:", result);
        response.status(204).end();
      } else {
        response.status(404).json({ error: "City not found" });
      }
    })
    .catch((error) => {
      console.error("Error deleting city:", error.message);
      response.status(500).json({ error: "Failed to delete city" });
    });

  /* Code for test data
  cities = cities.filter((city) => city.id !== id);
  response.status(204).end();
  */
});

// Endpoint to add a new city
app.post("/api/cities", async (request, response) => {
  const cityName = request.body.name;
  console.log("City name:", cityName);

  // Check if the city name is missing
  if (!cityName) {
    return response.status(400).json({ error: "City name is required" });
  }

  // Get the location data of the city and check if it exists
  const cityLocation = await getCityLocation(cityName);
  if (cityLocation.error) {
    console.error("Error getting city location:", cityLocation.error);
    return response
      .status(cityLocation.code)
      .json({ error: cityLocation.error });
  }

  // Check if the city already exists
  const exisitingCity = await City.findOne({
    // Use regex to check for case-insensitive match
    name: { $regex: `^${cityLocation.name}$`, $options: "i" },
  });
  console.log("Existing city:", exisitingCity);

  if (exisitingCity) {
    console.log("City already exists:", exisitingCity.name);
    return response.status(400).json({ error: "City already in list" });
  }

  /* Code to check if city exists for test data
  if (
    cities.some(
      (existingCity) =>
        existingCity.name.toLowerCase() === cityLocation.name.toLowerCase()
    )
  ) {
    return response.status(400).json({ error: "City already in list" });
  }
  */

  // Create a new city object with a unique ID
  const newCity = {
    name: cityLocation.name,
    lon: cityLocation.lon,
    lat: cityLocation.lat,
  };

  City.create(newCity)
    .then((createdCity) => {
      response.status(201).json(createdCity);
    })
    .catch((error) => {
      console.error("Error creating city:", error.message);
      response.status(500).json({ error: "Failed to save new city" });
    });

  /* Code for test data
  const newCity = {
    id: generateId(),
    name: cityLocation.name, // Use the name from the location data for clarity
    lat: cityLocation.lat,
    lon: cityLocation.lon,
  };
  cities = cities.concat(newCity);
  response.status(201).json(newCity);
  */
});

/**
 * The following endpoints are for managing weather data:
 * 1. GET /api/weather - Get weather data for all cities, not entirely sure if this is needed
 * 2. GET /api/weather/:id - Get weather data by city id
 */

// Endpoint to get weather data for all cities
app.get("/api/weather", async (request, response) => {
  // Go through all cities and get their weather data
  // Use map to create an array of promises for each city
  const cities = await City.find({});
  console.log("Cities:", cities);
  const weatherPromises = cities.map(async (city) => {
    const weather = await getWeatherById(city.id);
    // Check if the weather data was fetched successfully
    if (weather.error) {
      console.error("Error fetching weather data:", weather.error);
      return {
        id: city.id,
        name: city.name,
        error: weather.error,
      };
    } else {
      return {
        id: city.id,
        name: city.name,
        data: weather.data,
      };
    }
  });

  // Wait for all weather data to be fetched and return the results
  // Use Promise.all to wait for all promises to resolve
  try {
    const citiesWeather = await Promise.all(weatherPromises);
    console.log("Weather data for all cities:", citiesWeather);
    response.json(citiesWeather);
  } catch (error) {
    console.error("Error fetching weather data for all cities:", error.message);
    response.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get weather data by ID
app.get("/api/weather/:id", async (request, response) => {
  const id = request.params.id;
  const weather = await getWeatherById(id);
  console.log("Weather data:", weather.data);

  // Check the response code and return the appropriate status and data
  if (weather.error) {
    response.status(weather.code).json({ error: weather.error });
  } else {
    response.status(weather.code).json(weather.data);
  }
});

/**
 * The following endpoints are for getting the weather overview data (OPTIONAL):
 * 1. GET /api/overview - Get the weather overview for all cities
 * 2. GET /api/overview/:id - Get the weather overview by city id
 */

// Endpoint to get the weather overview for all cities
app.get("/api/overview", async (request, response) => {
  // Go through all cities and get their overview data
  const cities = await City.find({});
  console.log("Cities:", cities);
  const overviewPromises = cities.map(async (city) => {
    const overview = await getOverviewById(city.id);
    // Check if the overview data was fetched successfully
    if (overview.error) {
      console.error("Error fetching overview:", overview.error);
      return {
        id: city.id,
        name: city.name,
        error: overview.error,
      };
    } else {
      return {
        id: city.id,
        name: city.name,
        data: overview.data,
      };
    }
  });

  // Wait for all overview data to be fetched and return the results
  // Use Promise.all to wait for all promises to resolve
  try {
    const citiesWeather = await Promise.all(overviewPromises);
    console.log("Overview data for all cities:", citiesWeather);
    response.json(citiesWeather);
  } catch (error) {
    console.error(
      "Error fetching overview data for all cities:",
      error.message
    );
    response.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to get the weather overview by ID
app.get("/api/overview/:id", async (request, response) => {
  const id = request.params.id;
  const overview = await getOverviewById(id);
  console.log("Overview data:", overview.data);

  // Check the response code and return the appropriate status and data
  if (overview.error) {
    response.status(overview.code).json({ error: overview.error });
  } else {
    response.status(overview.code).json(overview.data);
  }
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  console.log("Error name", error.name);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else {
    console.log("YOU HAVE REACHED THE ELSE STATEMENT IN ERROR HANDLER");
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
