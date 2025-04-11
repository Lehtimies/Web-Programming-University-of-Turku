import axios from "axios";
const baseUrl = "/api/cities";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
    .then((response) => {
      console.log("Get all cities:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response?.status, error.response?.statusText);
      return { error: error.response?.statusText } ;
    });
};

const getById = (id) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Get by id:", error.response?.status, error.response?.statusText);
      return { error: error.response?.statusText || "Unknown error" };
    });
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request
    .then((response) => {
      console.log("create:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response?.status, error.response?.statusText);
      return { error: error.response?.statusText || "Unknown error" };
    });
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request
    .then((response) => {
      console.log("Deleted successfully");
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response?.status, error.response?.statusText);
      return { error: error.response?.statusText || "Unkown error" };
    });
};

export default { getAll, getById, create, remove };
