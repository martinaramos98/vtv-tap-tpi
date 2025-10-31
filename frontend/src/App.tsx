import type { PropsWithChildren } from "react";
import type React from "react";
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar/Navbar";

export interface AppProps {}
const App: React.FC<PropsWithChildren<AppProps>> = (props) => {
  return (
    <main className="w-full h-screen p-2 place-content-center place-items-center">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default App;
