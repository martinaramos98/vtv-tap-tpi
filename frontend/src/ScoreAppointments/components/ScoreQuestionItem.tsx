import { useState } from "react";
import type { IScoreAppointmentFormHook } from "../hooks/useScoreAppointmentForm";
import type { ServicePoint } from "../interfaces/ScoreAppointment";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ScoreQuestionItem: React.FC<{
  score: ServicePoint;
  onAnswer: IScoreAppointmentFormHook["onAnswerScore"];
}> = ({ score, onAnswer }) => {
  const items = Array.from({ length: 10 }, (_, i) => i + 1);
  const [value, setValue] = useState<number | null>(null);
  const onClickAnswer = (item: number) => {
    setValue(item);
    onAnswer({
      ...score,
      value: item,
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3>{score.name}</h3>
        </CardTitle>
        <CardDescription>{score.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-row justify-around ">
          {items.map((item) => (
            <li key={item}>
              <button
                type="button"
                className={clsx(
                  "cursor-pointer p-1  h-8 w-8  text-center place-content-center border border-gray-300 rounded-full shadow-sm ",
                  value === item
                    ? "bg-blue-500 text-white font-semibold"
                    : "bg-white text-black"
                )}
                onClick={() => {
                  onClickAnswer(item);
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
