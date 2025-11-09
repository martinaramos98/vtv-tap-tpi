import type { Appointment } from "@/Home/interfaces/Appointment";
import { useEffect, useState } from "react";
import type { IAdminAppointmentsHook } from "./useAdminAppointments.hook";
import type { ServicePoint } from "../interfaces/ScoreAppointment";

export interface IScoreAppointmentFormHook {
  scoreAppointmentData: Appointment | undefined;
  scores: (ServicePoint & { value: number })[];
  onAnswerScore: (score: ServicePoint & { value: number }) => void;
  error: Error | null;
  isLoading: boolean;
  servicePoints: ServicePoint[];
  onSubmit: () => Promise<void>;
}

export const useScoreAppointmentForm = (
  adminAppointmentsHook: IAdminAppointmentsHook,
  appointmentId: string
): IScoreAppointmentFormHook => {
  const [scoreAppointmentData, setScoreAppointmentData] = useState<
    Appointment | undefined
  >();
  const [scores, setScores] = useState<(ServicePoint & { value: number })[]>(
    []
  );
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [servicePoints, setServicePoints] = useState<ServicePoint[]>([]);

  useEffect(() => {
    const fetchServicePoints = async () => {
      try {
        const points = await adminAppointmentsHook.getScorePoints();
        setServicePoints(points);
      } catch (error) {
        console.error("Error fetching service points:", error);
      }
    };
    fetchServicePoints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentId]);

  const onAnswerScore = (score: ServicePoint & { value: number }) => {
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
  const onSubmit = async () => {
    setIsLoading(true);
    console.log(scores, "scores");
    let hasAllServicePointsAnswered = true;
    scores.forEach((scorePoint) => {
      if (!servicePoints.find((sp) => sp.id === scorePoint.id))
        hasAllServicePointsAnswered = false;
    });
    if (!hasAllServicePointsAnswered) {
      setError(
        new Error("Por favor, responda todos los puntos antes de enviar.")
      );
      setIsLoading(false);
      return;
    }
    try {
      await adminAppointmentsHook.submitScoreAppointment(
        scores.map((scr) => ({
          servicePointId: scr.id,
          value: scr.value,
          appointmentId: appointmentId,
          matricula: scoreAppointmentData?.matricula as string,
          description: "",
        }))
      );
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    scoreAppointmentData,
    scores,
    onAnswerScore,
    error,
    isLoading,
    servicePoints,
    onSubmit,
  };
};
