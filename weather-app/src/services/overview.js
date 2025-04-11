import axios from "axios";
const baseUrl = "/api/overview";

const getOverview = () => {
  const request = axios.get(baseUrl);
  return request
    .then(response => {
      console.log("Get overview:", response.data);
      return response.data
    })
    .catch(error => {
      console.error("Error:", error.response?.status, error.response?.statusText);
      return { error: error.response?.statusText || "Unknown error" };
    });
};

const getOverviewById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request
    .then(response => {
      console.log("Get overview by id:", response.data);
      return response.data;
    })
    .catch(error => {
      console.error("Error:", error.response?.status, error.response?.statusText);
      return { error: error.response?.statusText || "Unknown error" };
    });
};

export default { getOverview, getOverviewById };
