import React, { useContext, useEffect, useState } from "react";
import { IPost } from "../../types/PostTypes";
import { Api } from "../../Services/api";

interface Props {
  children: React.ReactNode;
}

interface IPostContext {
  getMostRead: () => void;
  postMostState?: IPost[];
}

export const PostContext = React.createContext<IPostContext>({
  getMostRead: () => {},
  postMostState: [],
});

export const PostProvider: React.FC<Props> = ({ children }) => {
  const [postMostState, setPostMostState] = useState<IPost[]>();

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
    const timeoutId = setTimeout(() => {
      sessionStorage.removeItem("postsMostReads");
    }, 120 * 60 * 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return <PostContext.Provider value={{ postMostState, getMostRead }}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);
