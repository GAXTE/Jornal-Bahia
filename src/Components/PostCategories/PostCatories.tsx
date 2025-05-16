import { useEffect, useState } from "react";
import { usePostContext } from "../../Providers/post/PostContext";
import { IPost } from "../../types/PostTypes";
import { DateComponent } from "../Date/Date";
import { useNavigate } from "react-router-dom";
import { Api } from "../../Services/api";

export const PostCategories = () => {
  const { AllPosts } = usePostContext();
  const [uniqueCategoryPosts, setUniqueCategoryPosts] = useState<IPost[]>([]);
  const [categoryFirstPost, setCategoryFirstPost] = useState<IPost | undefined>();
  const navi = useNavigate();

  const MAX_CHARS = 80; // Exemplo: limite de 100 caracteres

  function truncateText(text: string, maxChars: number): string {
    return text?.length > maxChars ? `${text.substring(0, maxChars)}...` : text;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await Api.get("/post?page=2&limit=25");
        const posts: IPost[] = response.data.posts;
        if (Array.isArray(posts)) {
          const filteredPosts = filterUniquePosts(posts);
          const shuffledPosts = shuffleArray(filteredPosts);
          const limitedPosts = shuffledPosts.slice(0, 5);
          setUniqueCategoryPosts(limitedPosts);
          setCategoryFirstPost(limitedPosts[0]);
        } else {
          console.error("A resposta da API não é um array:", posts);
        }
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };
    fetchPosts();
  }, []);

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
          className="self-start h-[33px] bg-primary lg:h-[39px]  bg- rounded label-category "
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
                    src={post.photoUrls[0]}
                    alt={truncateText(post.title, MAX_CHARS)}
                  />
                  <h2 className="cursor-pointer tittle-2" onClick={() => handlePostClick(post.id)}>
                    {post.title}
                  </h2>
                </div>
              )}
              {index !== 0 && (
                <div className="flex flex-col gap-[10px]">
                  <strong
                    className="label-mobile  cursor-pointer"
                    onClick={() => handleCategoryClick(post.categories[0].id)}
                  >
                    {post.categories[0].name}
                  </strong>
                  <h2 className=" cursor-pointer tittle-2-mobile" onClick={() => handlePostClick(post.id)}>
                    {truncateText(post.title, MAX_CHARS)}
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
