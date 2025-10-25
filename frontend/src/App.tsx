import type { PropsWithChildren } from "react";
import type React from "react";
import { Outlet } from "react-router";

export interface AppProps {}
const App: React.FC<PropsWithChildren<AppProps>> = (props) => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default App;
