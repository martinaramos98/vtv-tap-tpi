import type { Score } from "@/Home/interfaces/Appointment";

export interface ScoreAppointment {
  id: string;
  appointmentId: string;
  matricula: string;
  date: string;
  score: Score[];
}

export interface CreateScoreAppointmentDTO {
  appointmentId: string;
  score: Score[];
  matricula: string;
}
