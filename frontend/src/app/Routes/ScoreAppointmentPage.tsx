import { Spinner } from "@/components/ui/spinner";
import { useAdminAppointmentsHook } from "@/ScoreAppointments/hooks/useAdminAppointments.hook";
import { useScoreAppointments } from "@/ScoreAppointments/hooks/useScoreAppointment";

export const CreateAppointmentPage: React.FC = () => {
  const adminAppointmentsHook = useAdminAppointmentsHook();
  const scoreAppointmentsHook = useScoreAppointments(adminAppointmentsHook);
  return (
    <article>
      <h1>Verificaciones Pendientes</h1>
      {scoreAppointmentsHook.loading && (
        <>
          <Spinner className="size-12" />
          <p>Cargando verificaciones...</p>
        </>
      )}
      {!scoreAppointmentsHook.loading &&
        scoreAppointmentsHook.appointments.length === 0 && (
          <p>No hay verificaciones pendientes.</p>
        )}
      {!scoreAppointmentsHook.loading &&
        scoreAppointmentsHook.appointments.length > 0 && (
          <ul>
            {scoreAppointmentsHook.appointments.map((appointment) => (
              <li key={appointment.id}>
                Turno ID: {appointment.id} - Fecha:{" "}
                {new Date(appointment.date).toLocaleDateString()}
                <a href={`/verificaciones/${appointment.id}`}>
                  Iniciar Verificacion
                </a>
              </li>
            ))}
          </ul>
        )}
    </article>
  );
};
