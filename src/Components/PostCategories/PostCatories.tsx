import { useEffect, useState } from "react";
import { usePostContext } from "../../Providers/post/PostContext";
import { IPost } from "../../types/PostTypes";
import { DateComponent } from "../Date/Date";
import { useNavigate } from "react-router-dom";

export const PostCategories = () => {
  const { AllPosts } = usePostContext();
  const [uniqueCategoryPosts, setUniqueCategoryPosts] = useState<IPost[]>([]);
  const [categoryFirstPost, setCategoryFirstPost] = useState<IPost | undefined>();
  const navi = useNavigate();

  useEffect(() => {
    if (AllPosts) {
      const filteredPosts = filterUniquePosts(AllPosts);
      const shuffledPosts = shuffleArray(filteredPosts);
      const limitedPosts = shuffledPosts.slice(0, 5);
      setUniqueCategoryPosts(limitedPosts);
      setCategoryFirstPost(limitedPosts[0]);
    }
  }, [AllPosts]);

  const filterUniquePosts = (posts: IPost[]): IPost[] => {
    const uniqueCategoriesMap: { [categoryId: string]: IPost } = {};
    posts.forEach((post) => {
      if (post.categories && post.categories.length > 0) {
        const categoryId = post.categories[0].id;
        if (!uniqueCategoriesMap[categoryId]) {
          uniqueCategoriesMap[categoryId] = post;
        }
      }
    });

    return Object.values(uniqueCategoriesMap);
  };

  const shuffleArray = (array: any[]): any[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  if (!AllPosts) return null;

  const handlePostClick = (postId: string) => {
    navi(`/viewpost/${postId}`);
  };

  const handleCategoryClick = (categoryId: string | undefined) => {
    navi(`/categories/${categoryId}`);
  };

  return (
    <div className="flex-col">
      <ul className="flex flex-col  gap-[13px] max-w-[600px] lg:max-w-[348px]">
        <button
          className="self-start h-[33px] bg-primary lg:h-[39px] w-[97px] lg:w-[120px] bg- rounded label-category "
          onClick={() => handleCategoryClick(categoryFirstPost?.categories[0].id)}
        >
          {categoryFirstPost?.categories[0].name}
        </button>
        {uniqueCategoryPosts.map((post, index) => (
          <li
            key={post.id}
            className="flex flex-col mb-4 
          "
          >
            <div className="flex flex-col  mb-2 ">
              {index === 0 && (
                <div className="flex flex-col gap-6">
                  <img
                    onClick={() => handlePostClick(post.id)}
                    className="cursor-pointer max-w-[full] max-h-[188px] rounded-lg object-cover"
                    src={post.photoUrls}
                    alt={post.title}
                  />
                  <h2 className="cursor-pointer tittle-2" onClick={() => handlePostClick(post.id)}>
                    {post.title}
                  </h2>
                </div>
              )}
              {index !== 0 && (
                <div className="flex flex-col gap-[10px]">
                  <strong
                    className="label-mobile cursor-pointer"
                    onClick={() => handleCategoryClick(post.categories[0].id)}
                  >
                    {post.categories[0].name}
                  </strong>
                  <h2 className=" cursor-pointer tittle-2-mobile" onClick={() => handlePostClick(post.id)}>
                    {post.title}
                  </h2>
                </div>
              )}
              <DateComponent data={post.createdAt} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
