import { UIServiceProvider } from "./UIServiceContext";
import { AuthProvider } from "./UserContext";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <UIServiceProvider>{children}</UIServiceProvider>
      </AuthProvider>
    </>
  );
};
