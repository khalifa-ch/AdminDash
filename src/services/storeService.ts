// src/services/storeService.ts

import axios from "axios";

const API_URL = "http://localhost:3000/store";

export const getMyStores = async () => {
  try {
    const token = localStorage.getItem("authToken") || "";
    const response = await axios.get(`${API_URL}/MyStores`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
};
export const deleteStore = async (storeId: number): Promise<void> => {
  try {
    const token = localStorage.getItem("authToken") || "";
    await axios.delete(`${API_URL}/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error deleting store:", error);
    throw error;
  }
};

export const addStore = async (storeData: { name: string; address: string; city: string }) => {
  try {
    const token = localStorage.getItem("authToken") || "";
    const response = await axios.post(
      `${API_URL}`,
      {
        name: storeData.name,
        address: storeData.address,
        cityId: storeData.city, // Utilisation de l'ID de la ville
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding store:", error);
    throw error;
  }
};
export const getCities = async () => {
  try {
    const token = localStorage.getItem("authToken") || "";
    const response = await axios.get("http://localhost:3000/city", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
