import type { PropsWithChildren } from "react";
import type React from "react";
import { Outlet } from "react-router";
import { Navbar } from "./components/Navbar/Navbar";
import { Providers } from "./app/contexts/Providers";

export type AppProps = object;
const App: React.FC<PropsWithChildren<AppProps>> = () => {
  return (
    <Providers>
      <main className="w-full h-screen margin-auto">
        <Navbar />
        <Outlet />
      </main>
    </Providers>
  );
};

export default App;
