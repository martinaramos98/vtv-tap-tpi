import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
export const SignupPage = () => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Crea una cuenta</CardTitle>
          <CardDescription>
            Ingresa los datos para crear una cuenta.
          </CardDescription>
        </CardHeader>

        <form className="space-y-6">
          <CardContent>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input id="username" type="text" placeholder="Max Leiter" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" type="password" placeholder="********" />
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>

          <CardFooter className="justify-end gap-2">
            <Link to="/auth/login" className="text-sm mr-2">
              Ya tengo una cuenta
            </Link>
            <Button type="submit">Crear cuenta</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
