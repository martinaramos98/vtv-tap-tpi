import { useActionState, useEffect, useState } from "react";
import type { IAppointmentsService } from "../services/useAppointments.hook";
import { type Appointment } from "../interfaces/Appointment";

export const useAppointmentsUserController = (
  appointmentsHookService: IAppointmentsService
) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const getAppointmentsHandler = async () => {
    const data = await appointmentsHookService.getAppointments();
    if (data) {
      setAppointments(data);
      return null;
    }
    if (!data) {
      return "No appointments found";
    }
    return data;
  };

  const [error, load, isPending] = useActionState(getAppointmentsHandler, null);
  useEffect(() => {
    load();
  }, [load]);
  return {
    isPending,
    error,
    appointments,
  };
};
