# weather-app-backend

Backend for the Weather App project, built with Node.js, Express, and MongoDB.

## Stack

- Node.js + Express
- MongoDB + Mongoose
- Axios (for external and internal HTTP requests)
- CORS middleware
- Morgan (logging)
- dotenv (environment variable management)

## Weather Data

This backend fetches live weather data using the [OpenWeatherMap API](https://openweathermap.org/api).  
An API key is required and should be stored in your `.env` file.

Example:
```WEATHER_API_KEY=your_api_key_here```

## Development

To get started, create a `.env` file in the project root. A `.env.example` file is provided as a reference.

You’ll need:

- A MongoDB URI (create a project and cluster at [MongoDB](https://www.mongodb.com))
- An API key from [OpenWeatherMap](https://openweathermap.org/api)

Once your environment variables are set, install dependencies and start the development server:

```bash
npm install
npm run dev
```

## Development Notes

- Entry point: `index.js`
- Uses `nodemon` for development
- `.env` file required for API keys and DB connection
- MongoDB is used for persistence
- Frontend can be bundled into the backend via `build:ui`

## Serving the Frontend from the Backend

The frontend can be served from the root domain of the backend. To do this, run the `build:ui` script from the backend project:

```bash
npm run build:ui
```

This requires the frontend repository to be located in the same directory as the backend repository. if it is located elsewere then you can build and copy it manually.
1. In the frontend directory run:
```bash
npm run build
```
2. Copy the generated `/dist` folder inte the backend directory.
3. Start the backend server:
```bash
npm run dev
```

The frontend will be avalable on the root path of the backend server.

## Scripts

```bash
npm run dev        # Start dev server with nodemon
npm start          # Run server normally
npm run build:ui   # Build frontend and move it into backend
```
<br>

# Endpoints for backend
Below are the REST API endpoints for the backend

## City endpoints: /api/cities
### GET /api/cities/ 
Returns all the cities saved in the database
```JSON
Status code 200:
[
  {
    "name": "city_name",
    "lon": "longitude_coordinates",
    "lat": "latitude_coordinates",
    "id": "city_id"
  },
  {
    // Same info for all the other cities
  }
]
```

### GET /api/cities/id
Returns the information for a specific city based on the id used
```JSON
Status code 200:
{
  "name": "city_name",
  "lon": "longitude_coordinates",
  "lat": "latitude_coordinates",
  "id": "city_id"
}

Status code 404:
// Only happens if the id isn't in the database
// Returns nothing but the status code
```

### DELETE /api/cities/id
Deletes the entry for the city with the given id from the database
```JSON
Status code 204:
// Returns only status code, but means that the item was successfully deleted

Status code 404:
{
  "error": "City not found"
}

Status code 500:
{
  "error": "Failed to delete city"
}
```

### POST /api/cities
Adds a city to the database

**Request:**  \
This is what you have to send to the backend
```JSON
{
  "name": "city_name"
}
```

**Response:**  \
This is what is returned to the client/frontend
```JSON
Status code 201:
{
  "name": "city_name",
  "lon": "longitude_coordinates",
  "lat": "latitude_coordinates",
  "id": "city_id"
}

Status code 400:
// Different errors depending on what went wrong

// Error if city name is missing from request
{
  "error": "City name is required" 
}

// Error if the city is in the database already
{
  "error": "City already in list"
}

Status code 404:
{
  "error": "City does not exist"
}

Status code 500:
{
  "error": "Error checking city existence"
}
```

## Weather endpoints: /api/weather

### GET /api/weather
Returns the weather data for all cities, **unsure if it is needed at all**

**Response structure:**  \
The "data" key is what contains the weather information. The "name" and "id" keys are just to help identify the city in question. If an error occurs then the "error" key will be returned instead of the "data" key and contains the error information. If there was a problem in resolving the Promises for getting all weather information then it triggers a status code 500. 
```JSON
Status code 200:
[
  {
    "id": "city1_id",
    "name": "city1_name",
    "data": // Weather information
  },
  {
    "id": "city2_id",
    "name": "city2_name",
    "data": // Weather information
  },
  {
    "id": "city3_id",
    "name": "city3_name",
    "error": // Error information
  }
]

Status code 500:
{
  "error": "Internal server error"
}
```
**Example response for New York:**
```JSON
Status code 200:
[
  {
    "id": "1a2b3c",
    "name": "New York",
    "data": {
      "lat": 40.7128,
      "lon": -74.006,
      "timezone": "America/New_York",
      "timezone_offset": -14400,
      "current": {
        "dt": 1743966814,
        "sunrise": 1743935452,
        "sunset": 1743981926,
        "temp": 11.91,
        "feels_like": 11.06,
        "pressure": 1010,
        "humidity": 73,
        "dew_point": 7.23,
        "uvi": 0.7,
        "clouds": 100,
        "visibility": 10000,
        "wind_speed": 4.63,
        "wind_deg": 330,
        "weather": [
          {
            "id": 804,
            "main": "Clouds",
            "description": "overcast clouds",
            "icon": "04d"
          }
        ]
      },
      "hourly": [
        {
          // Same format as current for the current hour
        },
        {
          // Same format as current but for next hour
        },
        // ... Lists the weather for the next 48 hours like this
      ],
      "daily": [
        {
          // Lists weather for current day almost in the same format as in current  
        },
        {
          // Lists weather for tomorrow in almost same format as in current
        },
        // ... Lists the weather for the next week like this
      ]
    }
  }
] 
```

### GET /api/weather/id
Returns the weather data for a specific city based on the id used.

**Response structure:**  \
The "current" key is what contains all the relevant information for this hour, the "hourly" key contains the weather information for the next 48 hours, and the "daily" key contains the information for the next week. If an error occurs then the appropriate status code and error message will be returned. 
```JSON
Status code 200:
// New York example again
{
  "lat": 40.7128,
  "lon": -74.006,
  "timezone": "America/New_York",
  "timezone_offset": -14400,
  "current": {
    "dt": 1743966814,
    "sunrise": 1743935452,
    "sunset": 1743981926,
    "temp": 11.91,
    "feels_like": 11.06,
    "pressure": 1010,
    "humidity": 73,
    "dew_point": 7.23,
    "uvi": 0.7,
    "clouds": 100,
    "visibility": 10000,
    "wind_speed": 4.63,
    "wind_deg": 330,
    "weather": [
      {
        "id": 804,
        "main": "Clouds",
        "description": "overcast clouds",
        "icon": "04d"
      }
    ]
  },
  "hourly": [
    {
      // Same format as current for the current hour
    },
    {
      // Same format as current but for next hour
    },
    // ... Lists the weather for the next 48 hours like this
  ],
  "daily": [
    {
      // Lists weather for current day almost in the same format as in current  
    },
    {
      // Lists weather for tomorrow in almost same format as in current
    },
    // ... Lists the weather for the next week like this
  ]
}

Status code 404:
{
  "error": "City not found"
}

Status code 500:
{
  "error": "Error fetching weather data"
}
```

## Weather overview endpoints: /api/overview
Returns an AI generated summary of the weather at the given city / location.

### GET /api/overview
Returns the weather overview for all cities, **unsure if it is needed at all**

**Response structure:**  \
Just like with the weather endpoint, the "data" key is what contains the overview information. "id" and "name" are for identification. If an error occurs then the "error" key will be returned instead of the "data" key and contains the error information. If there was a problem in resolving the Promises for getting all weather information then it triggers a status code 500. 
```JSON
Status code 200:
[
  {
    "id": "city1_id",
    "name": "city1_name",
    "data": // Weather overview
  },
  {
    "id": "city2_id",
    "name": "city2_name",
    "data": // Weather overview
  },
  {
    "id": "city3_id",
    "name": "city3_name",
    "error": // Error information
  }
]

Status code 500:
{
  "error": "Internal server error"
}
```
**Example response for New York:**
```JSON
Status code 200:
[
  {
    "id": "1a2b3c",
    "name": "New York",
    "data": {
      "lat": 40.7128,
      "lon": -74.006,
      "tz": "-04:00",
      "date": "2025-04-06",
      "units": "metric",
      "weather_overview": "The current weather in our area is mostly cloudy with a temperature of 13°C and a wind speed of 5 m/s coming from the northwest. The humidity stands at 66%, and the visibility is at 10,000 meters. The air pressure is at 1011 hPa, with a dew point of 6°C. The weather feels like 12°C due to the wind chill factor. The UV index is at 0, indicating low risk from the sun's UV rays. Overall, it's a cool and breezy day with broken clouds in the sky. Don't forget to grab a light jacket before heading out!"
    }
  }
]
```

### GET /api/overview/id
Returns the weather overview for a specific city based on the id used.

**Response structure:**  \
The "weather_overview" key is what contains all the relevant information. If an error occurs then the appropriate status code and error message will be returned.
```JSON
Status code 200:
// New York example again
{
  "lat": 40.7128,
  "lon": -74.006,
  "tz": "-04:00",
  "date": "2025-04-06",
  "units": "metric",
  "weather_overview": "The current weather in our area is mostly cloudy with a temperature of 13°C and a wind speed of 5 m/s coming from the northwest. The humidity stands at 66%, and the visibility is at 10,000 meters. The air pressure is at 1011 hPa, with a dew point of 6°C. The weather feels like 12°C due to the wind chill factor. The UV index is at 0, indicating low risk from the sun's UV rays. Overall, it's a cool and breezy day with broken clouds in the sky. Don't forget to grab a light jacket before heading out!"
}

Status code 404:
{
  "error": "City not found"
}

Status code 500:
{
  "error": "Error fetching overview"
}
``` 