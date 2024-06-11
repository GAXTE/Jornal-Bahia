import React, { useContext } from "react";

interface Props {
  children: React.ReactNode;
}

interface IPostContext {}

export const PostContext = React.createContext<IPostContext>({});

export const PostProvider: React.FC<Props> = ({ children }) => {
  return <PostContext.Provider value={{}}>{children}</PostContext.Provider>;
};

export const usePostContext = () => useContext(PostContext);
