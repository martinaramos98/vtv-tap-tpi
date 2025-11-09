import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import type { AppointmentWithScores } from "../interfaces/Appointment";
import { LucideCalendar } from "lucide-react";
import { Button } from "@/components/ui/button";
export const AppointmentClientItem: React.FC<{
  appointment: AppointmentWithScores;
  onSelectAppointment: (appointment: AppointmentWithScores) => void;
}> = (props) => {
  const estadoAppointment =
    props.appointment.scores.length > 0 ? "Completado" : "Pendiente";
  return (
    <Item variant={"outline"}>
      <ItemMedia>
        <LucideCalendar />
      </ItemMedia>
      <ItemTitle>Turno para {props.appointment.matricula}</ItemTitle>
      <ItemDescription>
        Fecha: {new Date(props.appointment.date).toLocaleString()}
      </ItemDescription>
      <ItemContent>Estado: {estadoAppointment}</ItemContent>
      {props.appointment.scores.length > 0 && (
        <ItemActions>
          <Button
            onClick={() => props.onSelectAppointment(props.appointment)}
            variant={"ghost"}
            size={"sm"}
          >
            Ver Detalle
          </Button>
        </ItemActions>
      )}
    </Item>
  );
};
