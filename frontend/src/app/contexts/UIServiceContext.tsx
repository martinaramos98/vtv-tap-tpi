import { HomeAdminView } from "@/Home/components/HomeAdminView";
import { HomeClientView } from "@/Home/components/HomeClientView";
import { createContext, useContext } from "react";

export interface UIServiceContextValue {
  admin: {
    home: React.FC;
  };
  client: {
    home: React.FC;
  };
}
export interface UIService {
  uiContent: UIServiceContextValue;
}
const UIServiceContext = createContext<UIService | null>(null);

export const UIServiceProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const uiService: UIServiceContextValue = {
    admin: {
      home: HomeAdminView,
    },
    client: {
      home: HomeClientView,
    },
  };
  return (
    <UIServiceContext.Provider value={{ uiContent: uiService }}>
      {children}
    </UIServiceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUIService = () => {
  const context = useContext(UIServiceContext);
  if (!context) {
    throw new Error("useUIService must be used within a UIServiceProvider");
  }
  return context;
};
