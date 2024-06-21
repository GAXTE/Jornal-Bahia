import { Route, Routes } from "react-router-dom";
import { Homepage } from "../Pages/HomePage/Homepage";
import { PostCategoriesPage } from "../Pages/PostCategoriesPage/PostCategoriesPage";

export const RouterMain = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories/:categorieId" element={<PostCategoriesPage />} />
      </Routes>
    </>
  );
};
