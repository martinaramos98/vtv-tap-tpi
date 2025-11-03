import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./app/Router/Router.tsx";
import { RouterProvider } from "react-router";
import { AuthProvider } from "./app/contexts/UserContext";
import "./App.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
