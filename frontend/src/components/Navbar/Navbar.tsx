import { useAuth } from "@/app/contexts/UserContext";
import { Avatar, AvatarFallback } from "../ui/avatar";

export const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      {isAuthenticated && (
        <nav>
          {user && (
            <Avatar>
              <AvatarFallback>{user.fullName}</AvatarFallback>
            </Avatar>
          )}
        </nav>
      )}
    </>
  );
};
