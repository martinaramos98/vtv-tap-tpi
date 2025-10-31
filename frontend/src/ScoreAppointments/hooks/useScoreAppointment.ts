import { useEffect, useState } from "react";
import type { IAdminAppointmentsHook } from "./useAdminAppointments.hook";
import { type ScoreAppointment } from "../interfaces/ScoreAppointment";

export const useScoreAppointments = (
  adminAppointmentsHook: IAdminAppointmentsHook
) => {
  const [appointments, setAppointments] = useState<ScoreAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const onInit = async () => {
      try {
        const fetchedAppointments =
          await adminAppointmentsHook.getAllAppointments();
        setAppointments(fetchedAppointments);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    onInit();
  }, [adminAppointmentsHook]);

  return {
    appointments,
    loading,
    error,
  };
};
