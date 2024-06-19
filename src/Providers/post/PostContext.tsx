import React, { useContext, useEffect, useState } from "react";
import { IPost } from "../../types/PostTypes";
import { Api } from "../../Services/api";

interface Props {
  children: React.ReactNode;
}

interface IPostContext {
  getMostRead: () => void;
  getAllPosts: () => void;
  postMostState?: IPost[];
  AllPosts?: IPost[];
}

export const PostContext = React.createContext<IPostContext>({
  getAllPosts: () => {},
  getMostRead: () => {},
  postMostState: [],
  AllPosts: [],
});

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [AllPosts, setGetAllPosts] = useState<IPost[]>();
  const [postMostState, setPostMostState] = useState<IPost[]>();

  const getAllPosts = async () => {
    const cachedPosts = sessionStorage.getItem("allPosts");
    const lastFetchTime = sessionStorage.getItem("allPostsFetchTime");

    const tenMinutes = 5 * 60 * 1000;
    const now = new Date().getTime();

    if (cachedPosts && lastFetchTime && now - parseInt(lastFetchTime) < tenMinutes) {
      setGetAllPosts(JSON.parse(cachedPosts));
      return;
    }

    try {
      const { data } = await Api.get("/post");
      sessionStorage.setItem("allPosts", JSON.stringify(data));
      sessionStorage.setItem("allPostsFetchTime", now.toString());
      setGetAllPosts(data);
    } catch (error) {}
  };

  const getMostRead = async () => {
    const postsMostReads = sessionStorage.getItem("postsMostReads");
    const lastFetchTime = sessionStorage.getItem("lastFetchTime");

    const tenMinutes = 10 * 60 * 1000;
    const now = new Date().getTime();

    if (postsMostReads && lastFetchTime && now - parseInt(lastFetchTime) < tenMinutes) {
      setPostMostState(JSON.parse(postsMostReads));
      return;
    }

    try {
      const { data } = await Api.get("/filter/post/views");
      sessionStorage.setItem("postsMostReads", JSON.stringify(data));
      sessionStorage.setItem("lastFetchTime", now.toString());
      setPostMostState(data);
    } catch (error) {}
  };

  useEffect(() => {
    getMostRead();
    getAllPosts();
    const timeoutId = setTimeout(() => {
      sessionStorage.removeItem("postsMostReads");
      sessionStorage.removeItem("allPosts");
    }, 120 * 60 * 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <PostContext.Provider value={{ postMostState, getMostRead, getAllPosts, AllPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
