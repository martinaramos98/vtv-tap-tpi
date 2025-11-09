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
import { Link } from "react-router";
export const AppointmentClientItem: React.FC<{
  appointment: AppointmentWithScores;
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
        <Link to={`/detail/${props.appointment.id}`}>
          <ItemActions>Ver Detalle</ItemActions>
        </Link>
      )}
    </Item>
  );
};
