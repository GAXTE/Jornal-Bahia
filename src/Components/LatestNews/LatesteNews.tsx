import React, { useEffect, useState } from "react";
import { usePostContext } from "../../Providers/post/PostContext";
import { PublicityBanner } from "../PublicityBanner/PublicityBanner";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import { IPost } from "../../types/PostTypes";

export const LatestNews = () => {
  const { AllPosts, pagination } = usePostContext();
  const [page, setPage] = useState(0);
  const [paginatedView, setPaginatedView] = useState<IPost[]>([]);
  const idCount: Record<string, number> = {};
  console.log(AllPosts);
  useEffect(() => {
    const paginated = pagination(AllPosts, 3, page);
    console.log("depois ", paginated);

    setPaginatedView([...paginatedView, ...paginated]);
  }, [page]);

  return (
    <>
      <h2>Latest News</h2>
      <ul>
        {paginatedView.map((post, index) => {
          idCount[post.id] = (idCount[post.id] || 0) + 1;
          const key = `${post.id}-${idCount[post.id]}`;
          return (
            <React.Fragment key={key}>
              <li>
                <img src={post.photoUrls[0]} alt={"texto alternativo"} />
                <div>
                  <strong>{post.categories[0].name}</strong>
                  <h3>{post.title}</h3>
                </div>
              </li>
              {(index + 1) % 3 === 0 && <PublicityBanner />}
            </React.Fragment>
          );
        })}
      </ul>
      <InfiniteScroll Callback={() => setPage((page) => page + 1)} />
    </>
  );
};
