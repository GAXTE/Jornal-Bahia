import { Route, Routes } from "react-router-dom";
import { Homepage } from "../Pages/HomePage/Homepage";
import { PostCategoriesPage } from "../Pages/PostCategoriesPage/PostCategoriesPage";
import { SearchPage } from "../Pages/SearchPage/SearchPage";
import { PostViewPage } from "../Pages/PostViewPage/PostViewPage";
import { MostReadPage } from "../Pages/MostReadPage/MostReadPage";

export const RouterMain = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/categories/:categorieId" element={<PostCategoriesPage />} />
        <Route path="/search/:searchPost" element={<SearchPage />} />
        <Route path="/viewpost/:postId" element={<PostViewPage />} />
        <Route path="/mostread" element={<MostReadPage />} />
      </Routes>
    </>
  );
};
