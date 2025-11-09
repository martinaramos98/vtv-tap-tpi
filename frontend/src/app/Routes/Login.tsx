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
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../contexts/UserContext";
import { Spinner } from "@/components/ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
export const Login = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signin(username, password);
      navigate("/");
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  return (
    <div className="w-full max-w-lg mx-auto">
      {error && (
        <Alert variant={"destructive"} className="w-full mb-4">
          <AlertTitle className="flex flex-row items-center gap-2">
            <AlertCircleIcon />
            Error al iniciar sesión
          </AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para continuar.
          </CardDescription>
        </CardHeader>

        <form onSubmit={onSubmit} className="space-y-6">
          <CardContent>
            <FieldSet>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Username</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Max Leiter"
                    value={username}
                    onChange={onUsernameChange}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={onPasswordChange}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </CardContent>

          <CardFooter className="justify-end gap-2">
            <Link to="/auth/signup" className="text-sm mr-2">
              Registrarme
            </Link>
            <Button disabled={loading} type="submit">
              {loading ? (
                <>
                  <Spinner />
                  Ingresando
                </>
              ) : (
                "Ingresar"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
