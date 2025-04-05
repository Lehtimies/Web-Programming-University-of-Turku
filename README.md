# Endpoints for backend
Below are the REST API endpoints for the backend

## City endpoints: /api/cities
### GET /api/cities/ 
Returns all the cities saved in the database
```JSON
Status code 200:
[
  {
    "id": "city_id",
    "name": "city_name",
    "lat": "latitude_coordinates",
    "lon": "longitude_coordinates"
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
  "id": "city_id",
  "name": "city_name",
  "lat": "latitude_coordinates",
  "lon": "longitude_coordinates"
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
// NOTE!: Currently only status code, but will implement code 404 for id's not in db later when implementing MongoDB
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
Status code 200:
{
  "id": "city_id",
  "name": "city_name",
  "lat": "latitude_coordinates",
  "lon": "longitude_coordinates"
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

// Error if the city doesn't exist / if the weather api can't return a location for the city
{
  "error": "City does not exist, enter a valid city"
}
```

## Weather endpoints: /api/weather

### GET /api/weather
Returns the weather data for all cities, **unsure if it is needed at all**  \
**NOT YET IMPLEMENTED!**

### GET /api/weather/id
Returns the weather data for a specific city based on the id used  \
**NOT YET IMPLEMENTED**