import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CategoryProvider } from "./Providers/category/CategoryContext.tsx";
import { PublicityProvider } from "./Providers/publicity/PublicityContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoryProvider>
        <PublicityProvider>
          <App />
        </PublicityProvider>
      </CategoryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
