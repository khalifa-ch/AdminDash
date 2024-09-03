import axios from "axios";

const API_URL = "http://localhost:3000/car";

// Fonction pour récupérer le token depuis le stockage local
const getAuthToken = () => localStorage.getItem("authToken");

// Instance Axios avec configuration par défaut
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

// Fonction pour récupérer la liste des voitures
export const getCars = async () => {
  try {
    const response = await apiClient.get("/");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des voitures", error);
    throw error;
  }
};

// Fonction pour ajouter une nouvelle voiture
export const addCar = async (car: { make: string; model: string; licensePlate: string }) => {
  try {
    const response = await apiClient.post("/", car);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la voiture", error);
    throw error;
  }
};

// Fonction pour supprimer une voiture
export const deleteCar = async (id: number) => {
  try {
    await apiClient.delete(`/${id}`);
  } catch (error) {
    console.error("Erreur lors de la suppression de la voiture", error);
    throw error;
  }
};

// Fonction pour mettre à jour une voiture
export const updateCar = async (id: number, car: Partial<{ make: string; model: string; licensePlate: string }>) => {
  try {
    const response = await apiClient.put(`/${id}`, car);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la voiture", error);
    throw error;
  }
};
