import { HomeAdminView } from "@/Home/components/HomeAdminView";
import { HomeClientView } from "@/Home/components/HomeClientView";
import { createContext, useContext } from "react";

export interface UIService {}
const UIServiceContext = createContext<UIService | null>(null);

export const UIServiceProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const uiService: UIService = {
    admin: {
      home: HomeAdminView,
    },
    client: {
      home: HomeClientView,
    },
  };
  return (
    <UIServiceContext.Provider value={uiService}>
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
