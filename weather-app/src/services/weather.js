import axios from "axios";
const baseUrl = "/api/weather";

const getWeather = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log("Get weather response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching weather:",
      error.response?.status,
      error.response?.statusText
    );
    return { error: error.response?.statusText || "Unknown Error" };
  }
};

const getWeatherById = async (id) => {
  try {
    const request = axios.get(`${baseUrl}/${id}`);
    console.log("Get weather by id response:", request.data);
    return request.data;
  } catch (error) {
    console.error(
      "Error fetching weather by ID:",
      error.response?.status,
      error.response?.statusText
    );
    return { error: error.response?.statusText || "Unknown Error" };
  }
};

export default { getWeather, getWeatherById };
