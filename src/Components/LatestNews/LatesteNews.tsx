import React, { useEffect, useState } from "react";
import { usePostContext } from "../../Providers/post/PostContext";
import { PublicityBanner } from "../PublicityBanner/PublicityBanner";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import { IPost } from "../../types/PostTypes";
import { DateComponent } from "../Date/Date";
import { useNavigate } from "react-router-dom";

interface IProps {
  posts: IPost[];
}

export const LatestNews = ({ posts }: IProps) => {
  const { pagination } = usePostContext();
  const [page, setPage] = useState(1);
  const [paginatedView, setPaginatedView] = useState<IPost[]>([]);
  const idCount: Record<string, number> = {};
  const navi = useNavigate();
  useEffect(() => {
    const paginated = pagination(posts, 3, page);

    setPaginatedView([...paginatedView, ...paginated]);
  }, [page, posts]);
  const handlePostClick = (postId: string) => {
    navi(`/viewpost/${postId}`);
  };
  const handleCategoryClick = (categoryId: string) => {
    navi(`/categories/${categoryId}`);
  };
  return (
    <>
      <div className="flex flex-col max-w-[600px]">
        <ul className="flex flex-col gap-[25px] lg:max-w-[600px] ">
          <h2 className="tittle-1-mobile lg:title-1">Últimas Notícias</h2>
          {paginatedView.map((post, index) => {
            idCount[post.id] = (idCount[post.id] || 0) + 1;
            const key = `${post.id}-${idCount[post.id]}`;
            return (
              <React.Fragment key={key}>
                <li className="flex flex-col lg:flex-row gap-[20px]">
                  <img
                    className="cursor-pointer max-w-[full] max-h-[188px] rounded-lg lg:max-w-[249px] lg:min-w-[249px] lg:max-h-[249px] lg:min-h-[249px] object-cover"
                    src={post.photoUrls[0]}
                    alt={"texto alternativo"}
                    onClick={() => handlePostClick(post.id)}
                  />
                  <div className="flex flex-col gap-3">
                    <strong
                      className="label-mobile lg:label cursor-pointer"
                      onClick={() => handleCategoryClick(post.categories[0].id)}
                    >
                      {post.categories[0].name}
                    </strong>
                    <h3
                      className="tittle-2-mobile lg:tittle-2 cursor-pointer"
                      onClick={() => handlePostClick(post.id)}
                    >
                      {post.title}
                    </h3>
                    <DateComponent data={post.createdAt} />
                  </div>
                </li>
                {(index + 1) % 3 === 0 && <PublicityBanner />}
                <div className="h-1 lg:h-2"></div>
              </React.Fragment>
            );
          })}
        </ul>
        <InfiniteScroll Callback={() => setPage((page) => page + 1)} />
      </div>
    </>
  );
};
