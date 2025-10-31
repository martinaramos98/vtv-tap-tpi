import type { Score } from "@/Home/interfaces/Appointment";
import type { IScoreAppointmentFormHook } from "../hooks/useScoreAppointmentForm";

export const ScoreQuestionItem: React.FC<{
  score: Score;
  onAnswer: IScoreAppointmentFormHook["onAnswerScore"];
}> = ({ score, onAnswer }) => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <div>
      <h3>{score.description}</h3>
      {items.map((item) => {})}
    </div>
  );
};
