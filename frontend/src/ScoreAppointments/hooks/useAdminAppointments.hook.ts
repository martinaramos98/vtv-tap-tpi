import { useAuth } from "@/app/contexts/UserContext";
import { scoringAPI } from "@/app/rest/ScoringAPI";
import type {
  CreateScoreAppointmentDTO,
  ServicePoint,
} from "../interfaces/ScoreAppointment";

export interface IAdminAppointmentsHook {
  getAllAppointments: () => Promise<any>;
  submitScoreAppointment: (
    scoreData: CreateScoreAppointmentDTO[]
  ) => Promise<any>;
  getVerificationById: (id: string) => Promise<any>;
  getScorePoints: () => Promise<ServicePoint[]>;
}

export const useAdminAppointmentsHook = (): IAdminAppointmentsHook => {
  const authContext = useAuth();
  const getAllAppointments = async () => {
    try {
      const response = await scoringAPI.get("/scores", {
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all appointments:", error);
    }
  };

  const getVerificationById = async (id: string) => {
    try {
      const response = await scoringAPI.get(`/scores/${id}`, {
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching appointment by ID:", error);
    }
  };

  const submitScoreAppointment = async (
    scoreData: CreateScoreAppointmentDTO[]
  ) => {
    try {
      const response = await scoringAPI.post("/scores", scoreData, {
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error submitting score for appointment:", error);
    }
  };
  const getScorePoints = async () => {
    try {
      const response = await scoringAPI.get<ServicePoint[]>(
        `/scores/service-points`,
        {
          headers: {
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching score points:", error);
      throw error;
    }
  };
  return {
    getAllAppointments,
    submitScoreAppointment,
    getVerificationById,
    getScorePoints,
  };
};
