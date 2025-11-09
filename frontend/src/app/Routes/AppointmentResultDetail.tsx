import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
import type { AppointmentWithScores } from "@/Home/interfaces/Appointment";
import clsx from "clsx";
import { ArrowLeft } from "lucide-react";

export const AppointmentResultDetail: React.FC<{
  appointment: AppointmentWithScores;
  onSelectAppointment?: (appointment: AppointmentWithScores | null) => void;
}> = (props) => {
  const result =
    props.appointment.scores.reduce((acc, score) => acc + score.value, 0) /
    props.appointment.scores.length;
  return (
    <Card>
      <CardHeader className="flex flex-row">
        <Button
          variant="ghost"
          onClick={() => props.onSelectAppointment?.(null)}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-2xl font-semibold ">Resultado de Revision</h1>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p>Matricula: {props.appointment.matricula}</p>
        </CardDescription>
        <ul className="flex flex-col gap-2 ">
          {props.appointment.scores.map((score) => (
            <Item key={score.id} variant={"outline"}>
              <ItemContent>
                <ItemTitle>{score.name}</ItemTitle>
                <ItemDescription>{score.description}</ItemDescription>
                <div className="flex flex-row gap-2">
                  Resultado:{" "}
                  <span className="font-semibold">{score.value}</span>
                </div>
              </ItemContent>
            </Item>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex felx-col gap-1">
        <p>
          Resultado Final:{" "}
          <span
            className={clsx(
              "font-semibold",
              result < 5 ? "text-red-500" : "text-green-500"
            )}
          >
            {result}
          </span>
        </p>

        {result < 5 && (
          <p className="text-red-500">El resultado es insatisfactorio</p>
        )}
        {result >= 5 && (
          <p className="text-green-500">El resultado es satisfactorio</p>
        )}
      </CardFooter>
    </Card>
  );
};
