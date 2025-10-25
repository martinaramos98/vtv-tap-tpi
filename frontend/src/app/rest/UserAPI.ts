import axios from "axios";
export const userAPI = axios.create({
  baseURL: `${import.meta.env.VITE_USER_API_URL}`,
});
