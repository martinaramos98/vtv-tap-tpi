import { useAuth } from "@/app/contexts/UserContext";
import { appointmentAPI } from "@/app/rest/AppointmentAPI";
import type { Appointment } from "../interfaces/Appointment";

export interface IAppointmentsService {
  getAppointments: () => Promise<Appointment[]>;
  createAppointment: (appointmentData: {
    date: string;
    matricula: string;
  }) => Promise<Appointment>;
}

export const useAppointmentsHook = () => {
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
      await appointmentAPI.post("/appointments", appointmentData, {
        headers: {
          Authorization: `Bearer ${authContext.token}`,
        },
      });
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
  };

  return {
    getAppointments,
    createAppointment,
  };
};
