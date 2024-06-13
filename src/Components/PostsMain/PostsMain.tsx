import { useEffect, useState } from "react";
import { useCategoryContext } from "../../Providers/category/CategoryContext";
import { Slider } from "./Slider/Slider";
import { IPost } from "../../types/PostTypes";

export const PostsMain = () => {
  const { getAllPostByCategory, ListAllCategories } = useCategoryContext();
  const [posts, setPosts] = useState<IPost[] | []>([]);
  useEffect(() => {
    const getPosts = async () => {
      const posts1 = await getAllPostByCategory(ListAllCategories[0].id);
      const posts2 = await getAllPostByCategory(ListAllCategories[7].id);
      const posts3 = await getAllPostByCategory(ListAllCategories[8].id);

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
  }, []);
  return (
    <>
      <section className="mt-[16px] container mx-auto flex flex-wrap gap-[30px] lg:mt-[37px]">
        <div className="max-w-[600px] min-w-[320px]">
          <Slider />
        </div>
        <section className="w-full flex-col max-w-[443px] min-w-[320px] max-h-[499px]">
          {posts.map((post, index) => (
            <div className="flex gap-4 mb-[20px]" key={index}>
              <div className=" min-w-[79px] max-w-[153px]">
                <img
                  src={post.photoUrls[0]}
                  alt=""
                  className="rounded-md min-h-[100px] min-w-[79px] lg:h-[153px] lg:w-[153px] object-cover"
                />
              </div>
              <div className="flex-col max-w-[263px] min-w-[200px]">
                <span className="text-[#ff0000] mb-3">
                  <strong>{post.categories[0].name}</strong>
                </span>
                <p className="overflow-auto whitespace-normal mb-1">
                  <strong>{post.title}</strong>
                </p>
                <span className="text-sm opacity-50 text-black mt-2">
                  há 2 horas
                </span>
              </div>
            </div>
          ))}
        </section>
      </section>
    </>
  );
};
