import parse from "html-react-parser";
import { IPost } from "../../types/PostTypes";
import { useEffect } from "react";

interface IViewPost {
  post: IPost;
}

export const ViewPost = ({ post }: IViewPost) => {
  useEffect(() => {}, [post]);
  console.log(post.categories);
  return (
    <>
      <section className="max-w-[290px] lg:max-w-[620px] flex flex-col gap-3  ">
        <strong className="label-mobile lg:label">
          {post.categories[0].name}
        </strong>
        <h1 className="tittle-1-mobile lg:tittle-1">{post.title}</h1>
        <div className="lg:max-w-[620px]">
          {post ? parse(post.content) : <p>Carregando...</p>}
        </div>
      </section>
    </>
  );
};
