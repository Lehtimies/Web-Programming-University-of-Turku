require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Test data
let cities = require("./test-data.json");

// Weather API key
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
if (!WEATHER_API_KEY) {
  console.error("WEATHER_API_KEY is not set in the environment variables.");
  process.exit(1);
}

app.get("/", (request, response) => {
  response.send("<h2>Server is running!</h2>");
});

/*
 * The following endpoints are for managing cities:
 * 1. GET /api/cities - Get all cities
 * 2. GET /api/cities/:id - Get a city by ID
 * 3. DELETE /api/cities/:id - Delete a city by ID
 * 4. POST /api/cities - Add a new city
 */

// Endpoint to get all cities
app.get("/api/cities", (request, response) => {
  response.json(cities);
});

// Endpoint to get a city by ID
app.get("/api/cities/:id", (request, response) => {
  const id = request.params.id;
  const city = cities.find((city) => city.id === id);
  if (city) {
    response.json(city);
  } else {
    response.status(404).end();
  }
});

// Endpoint to delete a city
app.delete("/api/cities/:id", (request, response) => {
  const id = request.params.id;
  cities = cities.filter((city) => city.id !== id);
  response.status(204).end();
});

// Code to generate id for test data
const generateId = () => {
  return String(Math.floor(Math.random() * 1000000));
};

// Helper function to get the location data of a city
const getCityLocation = async (cityName) => {
  try {
    const response = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${WEATHER_API_KEY}`
    );

    // If the response status is 200 and the data array is not empty, the city exists
    if (response.status === 200 && response.data.length > 0) {
      const [name, lat, lon] = [
        response.data[0].name,
        response.data[0].lat,
        response.data[0].lon,
      ];
      console.log(`City: ${name}, Latitude: ${lat}, Longitude: ${lon}`);
      return { name, lat, lon };
    } else {
      console.log(`City: ${cityName} does not exist`);
      return null;
    }
  } catch (error) {
    console.error("Error checking city existence:", error.message);
    return null;
  }
};

// Endpoint to add a new city
app.post("/api/cities", async (request, response) => {
  const cityName = request.body.name;
  console.log("City name:", cityName);

  // Check if the city name is missing
  if (!cityName) {
    return response.status(400).json({ error: "City name is required" });
  }

  // Check if the city already exists
  if (
    cities.some(
      (existingCity) =>
        existingCity.name.toLowerCase() === cityName.toLowerCase()
    )
  ) {
    return response.status(400).json({ error: "City already in list" });
  }

  // Get the location data of the city and check if it exists
  const cityLocation = await getCityLocation(cityName);
  if (cityLocation === null) {
    return response
      .status(400)
      .json({ error: "City does not exist , enter a valid city" });
  }

  // Create a new city object with a unique ID
  const newCity = {
    id: generateId(),
    name: cityLocation.name, // Use the name from the location data for clarity
    lat: cityLocation.lat,
    lon: cityLocation.lon,
  };

  cities = cities.concat(newCity);

  response.status(201).json(newCity);
});

/*
 * The following endpoints are for managing weather data:
 * 1. GET /api/weather - Get weather data for all cities, not entirely sure if this is needed
 * 2. GET /api/weather/:id - Get weather data by city id
 */

// Endpoint to get weather data for all cities
app.get("/api/weather", (request, response) => {
  // TODO: Implement endpoint if needed
  response.send("<h2>Enpoint not yet implemented</h2>");
});

// Endpoint to get weather data by ID
app.get("/api/weather/:id", (request, response) => {
  // TODO: Implement endpoint
  response.send("<h2>Enpoint not yet implemented</h2>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
