import axios from "axios";

const API_URL = "http://localhost:8081/api/yates";

export const getYates = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener yates", error);
    throw error;
  }
};
