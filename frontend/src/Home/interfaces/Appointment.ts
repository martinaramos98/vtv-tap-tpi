export interface Appointment {
  id: string;
  date: string;
  matricula: string;
  userId: string;
}

export interface AppointmentWithScores extends Appointment {
  scores: ScoreResult[];
}

export interface ScoreResult {
  id: string;
  name: string;
  description: string;
  value: number;
}
export interface Score {
  id: string;
  value: number;
  createdAt: string;
  description: string;
}
