import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import { IPost } from "../../types/PostTypes";
import { DateComponent } from "../Date/Date";
import ImagemPlaceholder from "../../assets/noticiaPlacehlder.jpg";
import { PublicityBanner } from "../PublicityBanner/PublicityBanner";
import { usePostContext } from "../../Providers/post/PostContext";

export const LatestNews = () => {
  const [page, setPage] = useState(0);
  const [paginatedView, setPaginatedView] = useState<IPost[]>();
  const idCount: Record<string, number> = {};
  const { getAllPosts } = usePostContext();
  const navi = useNavigate();

  useEffect(() => {
    const fetchMorePosts = async () => {
      const newPosts = await getAllPosts(page, 10);
      if (newPosts && newPosts.length > 0) {
        setPaginatedView([...(paginatedView || []), ...newPosts]);
      }
    };

    if (page > 0) {
      fetchMorePosts();
    }
  }, [page]);

  const handlePostClick = (postId: string) => {
    navi(`/viewpost/${postId}`);
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (categoryId: string) => {
    navi(`/categories/${categoryId}`);
  };

  return (
    <div className="flex flex-col max-w-[600px]">
      <ul className="flex flex-col gap-[25px] lg:max-w-[600px]">
        <h2 className="tittle-1-mobile lg:title-1">Últimas Notícias</h2>
        {paginatedView &&
          paginatedView.map((post, index) => {
            if (!post || !post.id) return null;
            idCount[post.id] = (idCount[post.id] || 0) + 1;
            const key = `${post.id}-${idCount[post.id]}`;
            const imagem = (post.photoUrls && post.photoUrls[0]) || ImagemPlaceholder;
            return (
              <React.Fragment key={key}>
                <li className="flex flex-col lg:flex-row gap-[20px]">
                  <img
                    className="cursor-pointer max-w-full max-h-[188px] rounded-lg lg:max-w-[249px] lg:min-w-[249px] lg:max-h-[249px] lg:min-h-[249px] object-cover"
                    src={imagem}
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
  );
};
