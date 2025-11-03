import type { Score } from "@/Home/interfaces/Appointment";
import type { IScoreAppointmentFormHook } from "../hooks/useScoreAppointmentForm";

export const ScoreQuestionItem: React.FC<{
  score: Score;
  onAnswer: IScoreAppointmentFormHook["onAnswerScore"];
}> = ({ score, onAnswer }) => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);
  const onClickAnswer = (item: number) => {
    onAnswer({
      ...score,
      value: item,
    });
  };
  return (
    <div>
      <h3>{score.description}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <button
              type="button"
              onClick={() => {
                onClickAnswer(item);
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
