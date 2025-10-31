import { Spinner } from "@/components/ui/spinner";
import { useAdminAppointmentsHook } from "@/ScoreAppointments/hooks/useAdminAppointments.hook";
import { useScoreAppointmentForm } from "@/ScoreAppointments/hooks/useScoreAppointmentForm";
import { useParams } from "react-router";

export const ScoreFormPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const adminAppointmentsHook = useAdminAppointmentsHook();
  const scoreAppointmentFormHook = useScoreAppointmentForm(
    adminAppointmentsHook,
    params.id as string
  );
  return (
    <article>
      {scoreAppointmentFormHook.isLoading && <>
        <Spinner className="size-12" />
        <p>Cargando verificacion...</p>
      </>}
      {!scoreAppointmentFormHook.isLoading && scoreAppointmentFormHook.scoreAppointmentData && (
        <>
          <h1>Verificacion de: {scoreAppointmentFormHook.scoreAppointmentData.matricula}</h1>
          <form>
            {scoreAppointmentFormHook.scores.map((score) => (
            
            )
          </form>
        </>
      )}

    </article>

  )
}