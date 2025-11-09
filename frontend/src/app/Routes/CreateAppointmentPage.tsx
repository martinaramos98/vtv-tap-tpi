import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarCheck, ChevronDownIcon } from "lucide-react";
import { useCreateAppointmentController } from "@/Home/controllers/useCreateAppointment.controller";
import { Spinner } from "@/components/ui/spinner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useNavigate } from "react-router";
export const CreateAppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const createAppointmentController = useCreateAppointmentController();
  return (
    <>
      {createAppointmentController.resultAppointment ? (
        <>
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CalendarCheck />
              </EmptyMedia>
              <EmptyTitle>
                Turno Agendado Correctamente para el vehiculo con matricula{" "}
                {createAppointmentController.resultAppointment.matricula}
              </EmptyTitle>
              <EmptyDescription>
                Debes presentarte el dia{" "}
                {new Date(
                  createAppointmentController.resultAppointment.date
                ).toLocaleString()}
                . <br></br>
                En caso de no presentarse, deberas sacar un nuevo turno.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button
                onClick={() => {
                  navigate("/");
                }}
                variant="outline"
                size="sm"
              >
                Volver al Inicio
              </Button>
            </EmptyContent>
          </Empty>
        </>
      ) : (
        <Card className="max-w-[450px] mx-auto">
          <CardContent>
            <CardHeader>
              <CardTitle> Agendar Turno </CardTitle>
            </CardHeader>
            <CardDescription>
              Completa el siguiente formulario para agendar un nuevo turno.
            </CardDescription>
            <form
              onSubmit={createAppointmentController.onSubmit}
              className="mt-4 flex flex-col gap-2 "
            >
              <Field>
                <FieldContent>
                  <FieldLabel>Matricula</FieldLabel>
                  <Input
                    onChange={createAppointmentController.onChangeMatricula}
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldContent>
                  <FieldLabel>Fecha y Hora del Turno</FieldLabel>
                </FieldContent>

                <Popover
                  open={createAppointmentController.open}
                  onOpenChange={createAppointmentController.onOpenCalendar}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date"
                      className="w-48 justify-between font-normal"
                    >
                      {createAppointmentController.date
                        ? createAppointmentController.date.toLocaleDateString()
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      disabled={(date) => {
                        return date < new Date(new Date().setHours(0, 0, 0, 0));
                      }}
                      mode="single"
                      selected={createAppointmentController.date}
                      captionLayout="dropdown"
                      onSelect={createAppointmentController.onChangeDate}
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  id="time-picker"
                  step="1"
                  className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                  onChange={createAppointmentController.onChangeTime}
                />
              </Field>
              {createAppointmentController.error && (
                <div className="text-red-500 text-start">
                  {createAppointmentController.error}
                </div>
              )}
            </form>
          </CardContent>

          <CardFooter className=" justify-center">
            <Button
              disabled={createAppointmentController.loading}
              onClick={createAppointmentController.onSubmit}
            >
              {createAppointmentController.loading ? (
                <>
                  <Spinner />
                  Guardando Reserva
                </>
              ) : (
                "Agendar Turno"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};
