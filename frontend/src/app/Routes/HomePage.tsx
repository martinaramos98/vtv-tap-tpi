import { useEffect, useMemo } from "react";
import { useUIService } from "../contexts/UIServiceContext";
import { useAuth } from "../contexts/UserContext";
import { Spinner } from "@/components/ui/spinner";
import { AlertUserMessage } from "@/components/AlertUserMessage/AlertUserMessage";

export const HomePage: React.FC = () => {
  const uiService = useUIService();
  const authContext = useAuth();
  const Component = useMemo(() => {
    if (authContext.user) {
      if (authContext.user.role.name === "Administrator") {
        return uiService.uiContent.Administrator.home;
      } else if (authContext.user.role.name === "Client") {
        return uiService.uiContent.Client.home;
      }
      return null;
    } else if (authContext.isAuthenticated === false) {
      return AlertUserMessage;
    }
  }, [authContext.user, uiService, authContext.isAuthenticated]);
  useEffect(() => {}, []);
  return <>{!Component ? <Spinner className="size-12" /> : <Component />}</>;
};
