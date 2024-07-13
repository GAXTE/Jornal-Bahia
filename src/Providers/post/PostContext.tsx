import React, { useContext, useEffect, useState } from "react";
import { IPost } from "../../types/PostTypes";
import { Api } from "../../Services/api";

interface Props {
  children: React.ReactNode;
}

interface IPostContext {
  getMostRead: () => void;
  getAllPosts: () => void;
  getPostById: (id: string) => Promise<IPost>;
  search: (posts: IPost[], search: string) => IPost[];
  pagination: (obj: IPost[] | undefined | null, pageSize: number, pageNumber: number) => IPost[];
  postMostState?: IPost[];
  AllPosts?: IPost[];
}

export const PostContext = React.createContext<IPostContext>({
  getAllPosts: () => {},
  getMostRead: () => {},
  pagination: () => [],
  getPostById: async () => {
    return {} as IPost;
  },
  search: () => [],
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
      data.reverse();
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

  const getPostById = async (id: string) => {
    try {
      const { data } = await Api.get(`/post/${id}`);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const search = (posts: IPost[], searchTerm: string): IPost[] => {
    const regex = new RegExp(searchTerm, "i");
    const searchResult = posts.filter(
      (post) =>
        regex.test(post.title) ||
        regex.test(post.content) ||
        post.tags.some((tag) => regex.test(tag.name)) ||
        post.categories.some((category) => regex.test(category.name) || regex.test(category.description))
    );
    return searchResult;
  };

  const pagination = (obj: IPost[] | undefined | null, pageSize: number, pageNumber: number): IPost[] => {
    --pageNumber;
    if (!obj) return [];
    return obj.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
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
    <PostContext.Provider
      value={{
        postMostState,
        getMostRead,
        getAllPosts,
        AllPosts,
        pagination,
        search,
        getPostById,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => useContext(PostContext);
