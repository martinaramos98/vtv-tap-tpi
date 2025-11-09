import { useAuth } from "@/app/contexts/UserContext";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Link, useNavigate } from "react-router";
import { Home, LogOut } from "lucide-react";

export const Navbar: React.FC = () => {
  const { isAuthenticated, user, signout } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {isAuthenticated && (
        <nav className="border-solid border-gray-400 shadow-sm w-full px-2 py-1 mb-8 rounded-b-2xl">
          <ul className="flex flex-row gap-2 items-center px-2">
            {user && (
              <li>
                <Avatar>
                  <AvatarFallback>{user.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </li>
            )}
            <li>
              <Link to="/">
                <Home size={18} />
              </Link>
            </li>
            <li className="ml-auto">
              <button
                className="block cursor-pointer"
                onClick={() => {
                  signout();
                }}
              >
                <LogOut size={18} color="red" />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
