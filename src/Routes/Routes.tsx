import { Route, Routes } from "react-router-dom";
import { Homepage } from "../Pages/HomePage/Homepage";
import { PostCategoriesPage } from "../Pages/PostCategoriesPage/PostCategoriesPage";
import { SearchPage } from "../Pages/SearchPage/SearchPage";

export const RouterMain = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories/:categorieId" element={<PostCategoriesPage />} />
        <Route path="/search/:searchPost" element={<SearchPage />} />
      </Routes>
    </>
  );
};
