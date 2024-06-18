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

  const postsMostReads = sessionStorage.getItem("postsMostReads");
  const getMostRead = async () => {
    if (postsMostReads) {
      setPostMostState(JSON.parse(postsMostReads));
      return;
    }
    try {
      const { data } = await Api.get("/filter/post/views");
      sessionStorage.setItem("postsMostReads", JSON.stringify(data));
      setPostMostState(data);
    } catch (error) {}
  };
  useEffect(() => {
    getMostRead();
  }, []);
  return <PostContext.Provider value={{ postMostState, getMostRead }}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);
