import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { useAdminAppointmentsHook } from "@/ScoreAppointments/hooks/useAdminAppointments.hook";
import { useScoreAppointments } from "@/ScoreAppointments/hooks/useScoreAppointment";
import { isDateInPast } from "@/utils/date.util";
import { useNavigate } from "react-router";

export const ScoreAppointmentView: React.FC = () => {
  const navigate = useNavigate();
  const adminAppointmentsHook = useAdminAppointmentsHook();
  const scoreAppointmentsHook = useScoreAppointments(adminAppointmentsHook);
  const goToScoringPage = (appointmentId: string) => {
    navigate(`/score-appointment/${appointmentId}`);
  };
  return (
    <Card>
      <CardTitle>
        <CardTitle>
          <h1 className="ml-6">Verificaciones Pendientes</h1>
        </CardTitle>
      </CardTitle>
      <CardContent>
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
            <ul className="flex flex-col gap-2">
              {scoreAppointmentsHook.appointments.map((appointment) => (
                <Item key={appointment.id} variant={"outline"}>
                  <ItemHeader>
                    <ItemTitle>
                      Verificacion de Vehiculo: {appointment.matricula}
                    </ItemTitle>
                    <ItemDescription>
                      Fecha de Turno:{" "}
                      {new Date(appointment.date).toLocaleString()}
                    </ItemDescription>
                    <ItemContent>
                      <ItemActions className="ml-auto">
                        <Button
                          onClick={() => goToScoringPage(appointment.id)}
                          disabled={!isDateInPast(new Date(appointment.date))}
                          variant={"outline"}
                          size={"sm"}
                        >
                          Iniciar Verificacion
                        </Button>
                      </ItemActions>
                    </ItemContent>
                  </ItemHeader>
                </Item>
              ))}
            </ul>
          )}
      </CardContent>
    </Card>
  );
};
