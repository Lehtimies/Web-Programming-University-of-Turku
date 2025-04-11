import axios from "axios";
const baseUrl = "/api/weather";

const getWeather = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => {
      console.log("Get Weather:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response?.status, error.response?.statusText);
      return { error: error.response?.statusText || "Unknown Error"};
    })
};

const getWeatherById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request
    .then((response) => {
      console.log("Get weather by id:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response?.status, error.response?.statusText);
      return { error: error.response?.statusText || "Unknown Error"};
    })
};

export default { getWeather, getWeatherById };
