import { useEffect, useMemo } from "react";
import { useUIService } from "../contexts/UIServiceContext";
import { useAuth } from "../contexts/UserContext";
import { Spinner } from "@/components/ui/spinner";

export const HomePage: React.FC = () => {
  const uiService = useUIService();
  const authContext = useAuth();
  const Component = useMemo(() => {
    if (authContext.user) {
      if (authContext.user.role === "Administrator") {
        return uiService.uiContent.admin.home;
      } else if (authContext.user.role === "Client") {
        return uiService.uiContent.client.home;
      }
      return null;
    }
    return null;
  }, [authContext.user, uiService]);
  useEffect(() => {}, []);
  return <>{!Component ? <Spinner className="size-12" /> : <Component />}</>;
};
