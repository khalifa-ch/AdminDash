// src/services/orderService.ts

import axios from "axios";

const API_URL = "http://localhost:3000/order";

export const getMyOrders = async (storeId?: string) => {
  try {
    const token = localStorage.getItem("authToken"); // Récupère le token JWT
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: storeId ? { storeId } : {},
    };

    const response = await axios.get(`${API_URL}/MyOrders`, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const createOrder = async (orderData: {
  weight: number;
  storeId: string;
}) => {
  try {
    const token = localStorage.getItem("authToken"); // Récupère le token JWT
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Envoie des données au backend pour créer une commande
    const response = await axios.post(`${API_URL}`, orderData, config);

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
export const deleteOrder = async (id: number) => {
  try {
    const token = localStorage.getItem("authToken"); // Récupère le token JWT
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Envoie des données au backend pour créer une commande
    const response = await axios.delete(`${API_URL}/${id}`, config);

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
