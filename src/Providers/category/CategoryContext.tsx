import React, { useContext, useEffect, useState } from "react";
import { Api } from "../../Services/api";
import { IListCategory } from "../../types/CategoryTypes";
import { IPost } from "../../types/PostTypes";

interface Props {
  children: React.ReactNode;
}

interface ICategoryContext {
  getAllCategories: () => Promise<void>;
  getAllPostByCategory: (id: string) => Promise<IPost[]>;
  ListAllCategories: IListCategory;
  PostsMain: IPost[];
}

export const CategoryContext = React.createContext<ICategoryContext>({
  getAllCategories: async () => {},
  getAllPostByCategory: async () => [],
  ListAllCategories: [],
  PostsMain: [],
});

export const CategoryProvider: React.FC<Props> = ({ children }) => {
  const [ListAllCategories, setCategories] = useState<IListCategory>(
    JSON.parse(localStorage.getItem("categories") || "[]")
  );
  const [PostsMain, setPostsMain] = useState<IPost[]>([]);

  const CACHE_TTL = 10 * 60 * 1000; // 10 minutos em milissegundos

  const getAllCategories = async () => {
    try {
      const { data } = await Api.get("/category");
      localStorage.setItem("categories", JSON.stringify(data));
      setCategories(data);
    } catch (error) {}
  };

  const getAllPostByCategory = async (id: string) => {
    try {
      const { data } = await Api.get(`/post/category/${id}`);
      return data;
    } catch (error) {
      return [];
    }
  };

  const getPostsForMain = async () => {
    // const cachedPosts = sessionStorage.getItem("postMain");
    // const cachedTimestamp = sessionStorage.getItem("postMainTimestamp");
    // const currentTime = Date.now();

    // if (cachedPosts && cachedTimestamp && currentTime - parseInt(cachedTimestamp) < CACHE_TTL) {
    //   setPostsMain(JSON.parse(cachedPosts));
    //   return JSON.parse(cachedPosts);
    // }

    const { data } = await Api.get("/filter/slides");
    if (data) {
      // sessionStorage.setItem("postMain", JSON.stringify(sortedData.slice(0, 20)));
      // sessionStorage.setItem("postMainTimestamp", currentTime.toString());
      setPostsMain(data);
      return data;
    }
    return [];
  };

  useEffect(() => {
    getPostsForMain();
    getAllCategories();
    const interval = setInterval(() => {
      sessionStorage.removeItem("postMain");
      sessionStorage.removeItem("postMainTimestamp");
      getPostsForMain();
    }, CACHE_TTL);
    return () => clearInterval(interval);
  }, []);

  return (
    <CategoryContext.Provider
      value={{ getAllCategories, ListAllCategories, getAllPostByCategory, PostsMain }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => useContext(CategoryContext);
