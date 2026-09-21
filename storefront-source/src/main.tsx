import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./always-on/App.tsx";
import Entrance from "./always-on/Entrance.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
        {location.pathname.replace(/\/$/,'')===import.meta.env.BASE_URL.replace(/\/$/,'')&&!location.search.includes('journey=') ? <Entrance/> : <App/>}
    </BrowserRouter>
  </StrictMode>,
);
