import axios from "axios";
const baseUrl = "/api/cities";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log("getAll response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching cities:",
      error.response?.status,
      error.response?.statusText
    );
    return { error: error.response?.statusText || "Unknown error" };
  }
};

const getById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    console.log("getById response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching city by ID:",
      error.response?.status,
      error.response?.statusText
    );
    return { error: error.response?.statusText || "Unknown error" };
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    console.log("create response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding city:",
      error.response?.status,
      error.response?.statusText
    );
    return { error: error.response?.statusText || "Unknown error" };
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    console.log("remove response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting city:",
      error.response?.status,
      error.response?.statusText
    );
    return { error: error.response?.statusText || "Unknown error" };
  }
};

export default { getAll, getById, create, remove };
