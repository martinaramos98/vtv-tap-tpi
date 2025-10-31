import { Button } from "@/components/ui/button";
import { useAppointmentsUserController } from "../controllers/useAppointmentUser.controller";
import { useAppointmentsHook } from "../services/useAppointments.hook";
import { AppointmentClientItem } from "./AppointmentClientItem";

export const HomeClientView: React.FC = () => {
  const appointmentsService = useAppointmentsHook();
  const appointmentsController =
    useAppointmentsUserController(appointmentsService);
  return (
    <>
      <h1>Tus turnos</h1>
      {appointmentsController.appointments.map((appointment) => (
        <AppointmentClientItem appointment={appointment} />
      ))}
      <Button>Agendar nuevo turno</Button>
    </>
  );
};
