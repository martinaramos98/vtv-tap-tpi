import { useAuth } from "@/app/contexts/UserContext";
import { appointmentAPI } from "@/app/rest/AppointmentAPI";
import { scoringAPI } from "@/app/rest/ScoringAPI";

export const useAdminAppointmentsHook = () => {
  const authContext = useAuth();
  const getAllAppointments = async () => {
    try {
      const response = await appointmentAPI.get("/scores", {
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching all appointments:", error);
    }
  };
  const submitScoreAppointment = async (scoreData: {
    appointmentId: string;
    score: Record<string, number>;
  }) => {
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
  return {
    getAllAppointments,
    submitScoreAppointment,
  };
};
