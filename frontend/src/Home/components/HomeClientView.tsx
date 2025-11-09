import { Button } from "@/components/ui/button";
import { useAppointmentsUserController } from "../controllers/useAppointmentUser.controller";
import { useAppointmentsHook } from "../services/useAppointments.hook";
import { AppointmentClientItem } from "./AppointmentClientItem";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AppointmentResultDetail } from "@/app/Routes/AppointmentResultDetail";
import type { AppointmentWithScores } from "../interfaces/Appointment";

export const HomeClientView: React.FC = () => {
  const navigate = useNavigate();
  const appointmentsService = useAppointmentsHook();
  const appointmentsController =
    useAppointmentsUserController(appointmentsService);
  const handleNewAppointment = () => {
    document.startViewTransition(() => {
      navigate("/new-appointment");
    });
  };
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentWithScores | null>(null);
  const handleSelectAppointment = (
    appointment: AppointmentWithScores | null
  ) => {
    setSelectedAppointment(appointment);
  };
  return (
    <>
      {selectedAppointment ? (
        <AppointmentResultDetail
          onSelectAppointment={handleSelectAppointment}
          appointment={selectedAppointment}
        />
      ) : (
        <Card>
          <CardTitle>
            <h1 className="text-2xl font-semibold ml-6 ">Tus turnos</h1>
          </CardTitle>
          <CardContent className="flex flex-col gap-2">
            {appointmentsController.appointments.map((appointment) => (
              <AppointmentClientItem
                onSelectAppointment={handleSelectAppointment}
                appointment={appointment}
              />
            ))}
          </CardContent>
          <CardFooter className=" justify-end">
            <Button
              onClick={handleNewAppointment}
              className="flex flex-row items-center gap-2"
            >
              <CalendarDays />
              Agendar nuevo turno
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};
