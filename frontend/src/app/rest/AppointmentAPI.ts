import axios from "axios";
export const appointmentAPI = axios.create({
  baseURL: `${import.meta.env.VITE_APPOINTMENT_API_URL}`,
});
