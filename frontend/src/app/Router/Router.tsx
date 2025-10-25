import App from "@/App";
import { createBrowserRouter } from "react-router";
import { HomePage } from "../Routes/Home";
import { Login } from "../Routes/Login";
import { SignupPage } from "../Routes/Signup";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            Component: Login,
          },
          {
            path: "signup",
            Component: SignupPage,
          },
        ],
      },
    ],
  },
]);
