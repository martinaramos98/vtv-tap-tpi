import axios from "axios";
export const scoringAPI = axios.create({
  baseURL: `${import.meta.env.VITE_SCORING_API_URL}`,
});
