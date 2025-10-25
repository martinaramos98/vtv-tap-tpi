import { useAuth } from "@/app/contexts/UserContext";
import { Avatar, AvatarFallback } from "../ui/avatar";

export const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      {isAuthenticated && (
        <nav>
          <Avatar>
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
        </nav>
      )}
    </>
  );
};
