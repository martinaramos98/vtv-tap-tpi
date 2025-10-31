export interface Appointment {
  id: string;
  date: string;
  matricula: string;
  userId: string;
}

export interface AppointmentWithScores extends Appointment {
  scores: Score[];
}

export interface Score {
  id: string;
  value: number;
  createdAt: string;
  description: string;
}
