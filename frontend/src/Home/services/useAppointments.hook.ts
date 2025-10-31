import { useAuth } from "@/app/contexts/UserContext";
import { appointmentAPI } from "@/app/rest/AppointmentAPI";
import type {
  Appointment,
  AppointmentWithScores,
} from "../interfaces/Appointment";

export interface IAppointmentsService {
  getAppointments: () => Promise<AppointmentWithScores[]>;
  createAppointment: (appointmentData: {
    date: string;
    matricula: string;
  }) => Promise<Appointment>;
}

export const useAppointmentsHook = (): IAppointmentsService => {
  const authContext = useAuth();

  const getAppointments = async () => {
    try {
      const response = await appointmentAPI.get("/appointments", {
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const createAppointment = async (appointmentData: {
    date: string;
    matricula: string;
  }) => {
    try {
      const response = await appointmentAPI.post(
        "/appointments",
        appointmentData,
        {
          headers: {
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return {
    getAppointments,
    createAppointment,
  };
};
