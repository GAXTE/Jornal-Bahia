import React, { useEffect, useState } from "react";
import { usePostContext } from "../../Providers/post/PostContext";
import { PublicityBanner } from "../PublicityBanner/PublicityBanner";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import { IPost } from "../../types/PostTypes";
import { DateComponent } from "../Date/Date";

interface IProps {
  posts: IPost[];
}

export const LatestNews = ({ posts }: IProps) => {
  const { pagination } = usePostContext();
  const [page, setPage] = useState(1);
  const [paginatedView, setPaginatedView] = useState<IPost[]>([]);
  const idCount: Record<string, number> = {};
  useEffect(() => {
    const paginated = pagination(posts, 3, page);

    setPaginatedView([...paginatedView, ...paginated]);
  }, [page, posts]);
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
                <li className="flex flex-col gap-[20px]">
                  <img
                    className="max-w-[full] max-h-[188px] rounded-lg lg:max-w-[249px] lg:min-w-[249px] lg:max-h-[249px] lg:min-h-[249px] object-cover"
                    src={post.photoUrls[0]}
                    alt={"texto alternativo"}
                  />
                  <div className="flex flex-col gap-3">
                    <strong className="label-mobile lg:label">
                      {post.categories[0].name}
                    </strong>
                    <h3 className="tittle-2-mobile lg:tittle-2">
                      {post.title}
                    </h3>
                  </div>
                  <DateComponent data={post.createdAt} />
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
