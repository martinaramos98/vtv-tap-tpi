import { UserCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const AlertUserMessage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/auth/login");
    }, 2000);
  }, [navigate]);
  return (
    <Alert className="w-full items-start text-start" variant="destructive">
      <UserCircle />
      <AlertTitle>No has Iniciado sesion!</AlertTitle>
      <AlertDescription>
        Por favor, inicia sesion para ver el contenido de la pagina.<br></br> Se
        te rederigira a la pagina de login.
      </AlertDescription>
    </Alert>
  );
};
