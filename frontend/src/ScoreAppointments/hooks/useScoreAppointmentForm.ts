import type { Appointment, Score } from "@/Home/interfaces/Appointment";
import { useEffect, useState } from "react";
import type { IAdminAppointmentsHook } from "./useAdminAppointments.hook";

export interface IScoreAppointmentFormHook {
  scoreAppointmentData: Appointment | undefined;
  scores: Score[];
  onAnswerScore: (score: Score) => void;
  error: Error | null;
  isLoading: boolean;
}

export const useScoreAppointmentForm = (
  adminAppointmentsHook: IAdminAppointmentsHook,
  appointmentId: string
): IScoreAppointmentFormHook => {
  const [scoreAppointmentData, setScoreAppointmentData] = useState<
    Appointment | undefined
  >();
  const [scores, setScores] = useState<Score[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onInit = async () => {
      try {
        const appointment = await adminAppointmentsHook.getVerificationById(
          appointmentId
        );
        setScoreAppointmentData(appointment);
        setScores(appointment.scores);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    onInit();
  }, [adminAppointmentsHook, appointmentId]);

  const onAnswerScore = (score: Score) => {
    setScores((prevScores) => {
      const existingScoreIndex = prevScores.findIndex((s) => s.id === score.id);
      if (existingScoreIndex !== -1) {
        // Update existing score
        const updatedScores = [...prevScores];
        updatedScores[existingScoreIndex] = score;
        return updatedScores;
      }
      // Add new score
      return [...prevScores, score];
    });
  };
  return {
    scoreAppointmentData,
    scores,
    onAnswerScore,
    error,
    isLoading,
  };
};
