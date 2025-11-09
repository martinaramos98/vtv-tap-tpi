import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ScoreQuestionItem } from "@/ScoreAppointments/components/ScoreQuestionItem";
import { useAdminAppointmentsHook } from "@/ScoreAppointments/hooks/useAdminAppointments.hook";
import { useScoreAppointmentForm } from "@/ScoreAppointments/hooks/useScoreAppointmentForm";
import { useParams } from "react-router";

export const ScoreFormPage: React.FC = () => {
  const params = useParams<{ appointmentId: string }>();
  const adminAppointmentsHook = useAdminAppointmentsHook();
  const scoreAppointmentFormHook = useScoreAppointmentForm(
    adminAppointmentsHook,
    params.appointmentId as string
  );
  return (
    <article>
      {scoreAppointmentFormHook.isLoading && (
        <>
          <Spinner className="size-12" />
          <p>Cargando verificacion...</p>
        </>
      )}
      {!scoreAppointmentFormHook.isLoading &&
        scoreAppointmentFormHook.scoreAppointmentData && (
          <Card>
            <CardHeader>
              <CardTitle>
                Verificacion de:{" "}
                <span>
                  {scoreAppointmentFormHook.scoreAppointmentData.matricula}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                {scoreAppointmentFormHook.servicePoints.map((score) => (
                  <ScoreQuestionItem
                    score={score}
                    key={score.id}
                    onAnswer={scoreAppointmentFormHook.onAnswerScore}
                  />
                ))}
              </form>
            </CardContent>
            <CardFooter className="justify-end">
              <Button
                disabled={scoreAppointmentFormHook.isLoading}
                onClick={scoreAppointmentFormHook.onSubmit}
              >
                {scoreAppointmentFormHook.isLoading ? (
                  <Spinner />
                ) : (
                  "Enviar Calificaciones"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
    </article>
  );
};
