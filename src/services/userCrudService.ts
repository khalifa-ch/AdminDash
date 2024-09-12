import axios from "axios";

const API_URL = "http://localhost:3000";

// deliverer part

export const getDeliverers = async () => {
  const response = await axios.get(`${API_URL}/user/deliverers`);
  return response.data;
};

export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/user/${id}`);
  } catch (error) {
    throw new Error("Failed to delete user");
  }
};
export const addDeliverer = async (delivererData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cityId:string
}) => {
  try {
    await axios.post(`${API_URL}/user/deliverer`, delivererData);
  } catch (error) {
    throw new Error("Failed to add deliverer");
  }
};
// store owner part
export const getStoreOwners = async () => {
  const response = await axios.get(`${API_URL}/user/storeowners`);
  return response.data;
};

export const addStoreOwner = async (delivererData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    await axios.post(`${API_URL}/user/storeOwner`, delivererData);
  } catch (error) {
    throw new Error("Failed to add storeOwner");
  }
};
