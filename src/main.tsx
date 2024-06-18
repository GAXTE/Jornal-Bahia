import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CategoryProvider } from "./Providers/category/CategoryContext.tsx";
import { PublicityProvider } from "./Providers/publicity/PublicityContext.tsx";
import { PostProvider } from "./Providers/post/PostContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PostProvider>
        <CategoryProvider>
          <PublicityProvider>
            <App />
          </PublicityProvider>
        </CategoryProvider>
      </PostProvider>
    </BrowserRouter>
  </React.StrictMode>
);
