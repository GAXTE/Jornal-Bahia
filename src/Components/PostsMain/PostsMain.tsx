import { useEffect, useState } from "react";
import { useCategoryContext } from "../../Providers/category/CategoryContext";
import { Slider } from "./Slider/Slider";
import { IPost } from "../../types/PostTypes";
import { DateComponent } from "../Date/Date";
import { useNavigate } from "react-router-dom";

export const PostsMain = () => {
  const { getAllPostByCategory, ListAllCategories } = useCategoryContext();
  const [posts, setPosts] = useState<IPost[] | []>([]);
  const navi = useNavigate();
  useEffect(() => {
    const getPosts = async () => {
      const posts1 = await getAllPostByCategory(ListAllCategories[0].id);
      const posts2 = await getAllPostByCategory(ListAllCategories[6].id);
      const posts3 = await getAllPostByCategory(ListAllCategories[14].id);

      const post1 = posts1[posts1.length - 1];
      const post2 = posts2[posts2.length - 1];
      const post3 = posts3[posts3.length - 1];

      const newPosts = [];
      if (post1) newPosts.push(post1);
      if (post2) newPosts.push(post2);
      if (post3) newPosts.push(post3);

      setPosts(newPosts);
    };
    getPosts();
  }, [ListAllCategories]);
  const handlePostClick = (postId: string) => {
    navi(`/viewpost/${postId}`);
  };
  const handleCategoryClick = (categoryId: string) => {
    navi(`/categories/${categoryId}`);
  };

  const MAX_CHARS = 70;

  function truncateText(text: string, maxChars: number): string {
    return text.length > maxChars ? `${text.substring(0, maxChars)}...` : text;
  }

  return (
    <>
      <section className="mt-[16px] mx-auto flex flex-col lg:flex-row md:items-center  lg:items-stretch  gap-[30px] lg:mt-[37px] lg:justify-between">
        <div className="max-w-[600px] min-w-[320px]">
          <Slider />
        </div>
        <section className="flex-col min-w-[320px] md:w-[600px] lg:w-[430px]">
          <ul className="">
            {posts.map((post, index) => (
              <li className="flex gap-4 mb-[20px]" key={index}>
                <div className=" min-w-[79px] max-w-[153px]">
                  <img
                    src={post.photoUrls[0]}
                    alt=""
                    className="cursor-pointer rounded-lg min-h-[79px] max-w-[79px] lg:h-[153px] lg:w-[153px] lg:max-w-[153px]  object-cover"
                    onClick={() => handlePostClick(post.id)}
                  />
                </div>
                <div className="flex flex-col max-w-[263px] min-w-[200px] md:min-w-[500px] lg:min-w-[100px] lg:max-w-[263px]">
                  <strong className=" label-mobile lg:label mb-2"
                    onClick={() => handleCategoryClick(post.categories[0].id)}
                    >
                    {post.categories[0].name}
                  </strong>
                  <h3
                    className="cursor-pointer tittle-3- overflow-auto whitespace-normal "
                    onClick={() => handlePostClick(post.id)}
                  >
                    {truncateText(post.title, MAX_CHARS)}
                  </h3>
                  <DateComponent data={post.createdAt} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
};
