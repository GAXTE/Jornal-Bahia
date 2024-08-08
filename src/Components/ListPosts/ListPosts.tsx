import React, { useEffect, useState } from "react";
import { usePostContext } from "../../Providers/post/PostContext";
import { IPost } from "../../types/PostTypes";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import { PublicityBanner } from "../PublicityBanner/PublicityBanner";
import { useNavigate } from "react-router-dom";

interface IProps {
  children: React.ReactElement;
  posts?: IPost[];
}

export const ListPosts = ({ children, posts = [] }: IProps) => {
  const { pagination } = usePostContext();
  const [page, setPage] = useState(1);
  const [paginatedView, setPaginatedView] = useState<IPost[]>([]);
  const idCount: Record<string, number> = {};
  const navi = useNavigate();

  useEffect(() => {
    if (Array.isArray(posts)) {
      const paginated = pagination(posts, 3, page);
      setPaginatedView((prev) => [...prev, ...paginated]);
    } else {
    }
  }, [posts, page]);

  const handlePostClick = (postId: string) => {
    navi(`/viewpost/${postId}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    navi(`/categories/${categoryId}`);
  };

  return (
    <>
      <section className="flex flex-col my-8 items-center">
        <ul className="flex flex-col md:max-w-[600px] lg:max-w-[550px]">
          <div className="self-start tittle-1-mobile lg:tittle-list-post">
            {children}
            <span className="opaque-text">{posts.length} resultados</span>
          </div>
          {Array.isArray(posts) &&
            paginatedView.map((post, index) => {
              idCount[post.id] = (idCount[post.id] || 0) + 1;
              const key = `${post.id}-${idCount[post.id]}`;
              return (
                <React.Fragment key={key}>
                  <li key={post.id} className="flex flex-col mt-[25px] gap-[27px] items-center">
                    <img
                      src={post.photoUrls}
                      alt={""}
                      onClick={() => handlePostClick(post.id)}
                      className="cursor-pointer w-full max-h-[188px] rounded-lg object-cover lg:max-w-[550px] lg:min-w-[249px] lg:max-h-[249px] lg:min-h-[249px]"
                    />
                    <div className="flex flex-col items-start justify-center gap-3">
                      <strong
                        className="label-mobile lg:label cursor-pointer"
                        onClick={() => handleCategoryClick(post.categories[0].id)}
                      >
                        {post.categories[0].name}
                      </strong>
                      <h3
                        className="cursor-pointer tittle-2-mobile lg:tittle-2 lg:text-[24px]"
                        onClick={() => handlePostClick(post.id)}
                      >
                        {post.title}
                      </h3>
                    </div>
                  </li>
                  {(index + 1) % 3 === 0 && <PublicityBanner />}
                </React.Fragment>
              );
            })}
        </ul>
        <InfiniteScroll Callback={() => setPage((page) => page + 1)} />
      </section>
    </>
  );
};
