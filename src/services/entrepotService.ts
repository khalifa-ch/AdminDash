import axios from "axios";

const API_URL = "http://localhost:3000/entrepot";

export const getMyEntrepots = async () => {
  try {
    const token = localStorage.getItem("authToken") || "";
    const response = await axios.get(`${API_URL}/MyEntrepots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching entrepots:", error);
    throw error;
  }
};

export const deleteEntrepot = async (entrepotId: number): Promise<void> => {
  try {
    const token = localStorage.getItem("authToken") || "";
    await axios.delete(`${API_URL}/${entrepotId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting entrepot:", error);
    throw error;
  }
};
// src/services/entrepotService.ts

export const addEntrepot = async (
  name: string,
  capacity: number,
  address: string,
  cityId: string
) => {
  try {
    const token = localStorage.getItem("authToken") || "";
    const response = await axios.post(
      API_URL,
      { name, capacity, address, cityId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding entrepot:", error);
    throw error;
  }
};

export const getAvailbleEntrepots = async () => {
  try {
    const token = localStorage.getItem("authToken") || "";
    const response = await axios.get(`${API_URL}/availableEntrepots`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching entrepots:", error);
    throw error;
  }
};