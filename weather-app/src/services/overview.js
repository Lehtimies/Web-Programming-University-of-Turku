import axios from "axios";
const baseUrl = "/api/overview";

const getOverview = async () => {
  try {
    const response = await axios.get(baseUrl);
    console.log("Get overview response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching overview:",
      error.response?.status,
      error.response?.statusText
    );
    return { error: error.response?.statusText || "Unknown error" };
  }
};

const getOverviewById = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    console.log("Get overview by id response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching overview by ID:",
      error.response?.status,
      error.response?.statusText
    );
    return { error: error.response?.statusText || "Unknown error" };
  }
};

export default { getOverview, getOverviewById };
