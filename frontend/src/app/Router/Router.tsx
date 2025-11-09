import App from "@/App";
import { createBrowserRouter } from "react-router";
import { HomePage } from "../Routes/HomePage";
import { Login } from "../Routes/Login";
import { SignupPage } from "../Routes/Signup";
import { CreateAppointmentPage } from "../Routes/CreateAppointmentPage";
import { ScoreFormPage } from "../Routes/ScoreFormPage";

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
        path: "/new-appointment",
        Component: CreateAppointmentPage,
      },
      {
        path: "/score-appointment/:appointmentId",
        Component: ScoreFormPage,
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
