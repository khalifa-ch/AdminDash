import axios from "axios";

const API_URL = "http://localhost:3000";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/user/signin`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to login");
  }
};
