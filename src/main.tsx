import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          fontSize: "16px",
          padding: "16px 24px",
          borderRadius: "12px",
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontWeight: "800",
        },
      }}
    ></Toaster>
  </StrictMode>
);
