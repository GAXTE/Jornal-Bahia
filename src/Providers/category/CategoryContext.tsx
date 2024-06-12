import Cache from "js-cache";
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

const cache = new Cache();
const CACHE_KEY = "postMain";
const CACHE_TIMESTAMP_KEY = "postMainTimestamp";
const CACHE_TTL = 0.2 * 60 * 1000; // 10 minutos em milissegundos

export const CategoryProvider: React.FC<Props> = ({ children }) => {
  const [ListAllCategories, setCategories] = useState<IListCategory>(
    JSON.parse(localStorage.getItem("categories") || "[]")
  );
  const [PostsMain, setPostsMain] = useState<IPost[]>([]);

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
    const cachedPosts = cache.get(CACHE_KEY);
    const cachedTimestamp = cache.get(CACHE_TIMESTAMP_KEY);
    const currentTime = Date.now();

    if (cachedPosts && cachedTimestamp && currentTime - cachedTimestamp < CACHE_TTL) {
      setPostsMain(cachedPosts);
      return cachedPosts;
    }

    const data = await getAllPostByCategory("89202bb2-5f14-4a7d-bf18-217cd161ac82");
    if (data) {
      const sortedData = data.sort(
        (a: IPost, b: IPost) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
      cache.set(CACHE_KEY, sortedData, CACHE_TTL);
      cache.set(CACHE_TIMESTAMP_KEY, currentTime, CACHE_TTL);
      setPostsMain(sortedData);
      return sortedData;
    }
    return [];
  };

  useEffect(() => {
    getPostsForMain();
    getAllCategories();
    const interval = setInterval(getPostsForMain, CACHE_TTL);
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
