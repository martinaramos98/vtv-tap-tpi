import { useState } from "react";
import { useAppointmentsHook } from "../services/useAppointments.hook";
import type { Appointment } from "../interfaces/Appointment";

export const useCreateAppointmentController = () => {
  const appointmentsService = useAppointmentsHook();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [matricula, setMatricula] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [resultAppointment, setResultAppointment] =
    useState<Appointment | null>(null);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(undefined);
      console.log({ date, time, matricula });
      if (!date || !time || !matricula) {
        setError("Por favor complete todos los campos.");
        return;
      }
      setLoading(true);
      const repsonse = await appointmentsService.createAppointment({
        date: new Date(date.toDateString() + " " + time).toISOString(),
        matricula,
      });
      setResultAppointment(repsonse);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };
  const onChangeDate = (selectedDate: Date) => {
    setDate(selectedDate);
    setOpen(false);
  };
  const onOpenCalendar = (isOpen: boolean) => {
    setOpen(isOpen);
  };
  const onChangeMatricula = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMatricula(e.target.value);
  };
  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };
  return {
    open,
    date,
    time,
    matricula,
    onSubmit,
    onChangeDate,
    onOpenCalendar,
    onChangeMatricula,
    onChangeTime,
    loading,
    error,
    resultAppointment,
  };
};
